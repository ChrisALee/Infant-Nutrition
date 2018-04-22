import * as Boom from 'boom';
import * as Hapi from 'hapi';
import knexnest = require('knexnest');
import generate = require('nanoid/generate');
import url = require('nanoid/url');

import Knex from '../../utils/knex';

export const getQuizzes = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const results = await Knex('quizzes').select(
            'name',
            'num_questions',
            'guid',
        );

        if (!results || results.length === 0) {
            return {
                error: true,
                errMessage: 'no quizzes found',
            };
        }

        return results;
    } catch (err) {
        request.log('api', err);
        throw Boom.internal('Internal database error');
    }
};

// Used to get the quizzes with their questions and answers in one go
export const getFullQuizzes = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    // TODO: Support queries
    try {
        request.log('made it to before sql in getFullQuizes');
        const sql = Knex('quizzes AS qz')
            .innerJoin('questions AS qst', 'qst.quiz_guid', 'qz.guid')
            .innerJoin('answers AS a', 'a.question_guid', 'qst.guid')
            .select(
                'qz.guid AS _guid',
                'qz.name AS _quiz',
                'qst.guid AS _questions__guid',
                'qst.question AS _questions__question',
                'a.guid AS _questions__answers__guid',
                'a.answer AS _questions__answers__answer',
                'a.is_correct AS _questions__answers__isCorrect',
            );

        request.log('made it to after sql in getFullQuizzes:', sql);

        const results = await knexnest(sql);
        request.log('made it to right before result check:', results);

        if (!results || results.length === 0) {
            return {
                error: true,
                errMessage: 'no quizzes found',
            };
        }

        request.log('made it to right before return:', sql);
        return results;
    } catch (err) {
        request.log('api', err);
        throw Boom.internal('Internal database error');
    }
};

export const getQuestions = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { quizGuid }: any = request.params;

        const results = await Knex('questions')
            .where({
                quiz_guid: quizGuid,
            })
            .select('question', 'guid');

        if (!results || results.length === 0) {
            return {
                error: true,
                errMessage: 'no questions found',
            };
        }

        return results;
    } catch (err) {
        request.log('api', err);
        throw Boom.internal('Internal database error');
    }
};

export const getAnswers = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { questionGuid }: any = request.params;

        const results = await Knex('answers')
            .where({
                question_guid: questionGuid,
            })
            .select('answer', 'is_correct');

        if (!results || results.length === 0) {
            return {
                error: true,
                errMessage: 'no answers found',
            };
        }

        return results;
    } catch (err) {
        request.log('api', err);
        throw Boom.internal('Internal database error');
    }
};

export const getResultsCurrent = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { userGuid }: any = request.auth.credentials;

        const results = await Knex('quiz_results')
            .join('quizzes', 'quiz_results.quiz_guid', 'quizzes.guid')
            .where({
                user_guid: userGuid,
            })
            .select('quiz_results.score', 'quizzes.name');

        if (!results || results.length === 0) {
            return {
                error: true,
                errMessage: 'no quiz results found',
            };
        }

        return results;
    } catch (err) {
        request.log('api', err);
        throw Boom.internal('Internal database error');
    }
};

export const postResultsCurrent = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { quiz_result, quizGuid }: any = request.payload;
        const { userGuid }: any = request.auth.credentials;

        const guid = generate(url, 10);

        const insertOperation = await Knex('quiz_results').insert({
            user_guid: userGuid,
            quiz_guid: quizGuid,
            score: quiz_result.score,
            guid,
        });

        return {
            data: guid,
            message: 'successfully created quiz results',
        };
    } catch (err) {
        request.log('api', err);
        throw Boom.internal('Internal database error');
    }
};
