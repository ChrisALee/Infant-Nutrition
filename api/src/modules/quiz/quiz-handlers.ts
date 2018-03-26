import * as Hapi from 'hapi';
import generate = require('nanoid/generate');
import url = require('nanoid/url');

import Knex from '../../utils/knex';

export const getQuizzes = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const results = await Knex('quizzes').select('name', 'num_questions');

        if (!results || results.length === 0) {
            return {
                error: true,
                errMessage: 'no quizzes found',
            };
        }

        return results;
    } catch (err) {
        console.log(err);
        return err;
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
            .select('question');

        if (!results || results.length === 0) {
            return {
                error: true,
                errMessage: 'no questions found',
            };
        }

        return results;
    } catch (err) {
        console.log(err);
        return err;
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
        console.log(err);
        return err;
    }
};

export const getResults = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { userGuid }: any = request.params;
        const { authGuid }: any = request.auth.credentials;

        if (authGuid !== userGuid) {
            return {
                error: true,
                errMessage: 'Invalid user',
            };
        }

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
        console.log(err);
        return err;
    }
};

export const postResults = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { quizGuid, userGuid }: any = request.params;
        const { quiz_result }: any = request.payload;
        const { authGuid }: any = request.auth.credentials;

        if (authGuid !== userGuid) {
            return {
                error: true,
                errMessage: 'Invalid user',
            };
        }

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
        console.log(err);
        return err;
    }
};
