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
        questionGuid: Joi.string()
            .required()
            .description('the guid for the question'),
    },
};

export const postResultsCurrent = {
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
        quizGuid: Joi.string()
            .required()
            .description('the guid for the quiz result owner'),
    },
};
