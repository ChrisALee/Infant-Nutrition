import * as Joi from 'joi';

export const getQuestions = {
    params: {
        quizGuid: Joi.string()
            .required()
            .description('the guid for the quiz'),
    },
};

export const getAnswers = {
    params: {
        quizGuid: Joi.string()
            .required()
            .description('the guid for the quiz'),
    },
};

export const getResults = {
    params: {
        userGuid: Joi.string()
            .required()
            .description('the guid for the user'),
    },
};

export const postResults = {
    params: {
        quizGuid: Joi.string()
            .required()
            .description('the guid for the quiz'),
        userGuid: Joi.string()
            .required()
            .description('the guid for the user'),
    },
    payload: {
        quiz_result: Joi.object()
            .keys({
                score: Joi.number()
                    .integer()
                    .min(0)
                    .max(1000)
                    .required(),
            })
            .required()
            .description('the quiz result body json payload'),
    },
};
