import * as Boom from 'boom';
import * as Hapi from 'hapi';
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

export const getQuestions = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { quizGuid }: any = request.params;

        const results = await Knex('questions')
            .where({
                owner: quizGuid,
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
                owner: questionGuid,
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
            .join('quizzes', 'quiz_results.quiz_owner', 'quizzes.guid')
            .where({
                user_owner: userGuid,
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
            user_owner: userGuid,
            quiz_owner: quizGuid,
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
