import * as Joi from 'joi';

exports.getQuestions = {
    params: {
        quizGuid: Joi.string()
            .required()
            .description('the guid for the quiz'),
    },
};

exports.getAnswers = {
    params: {
        quizGuid: Joi.string()
            .required()
            .description('the guid for the quiz'),
    },
};

exports.getResults = {
    params: {
        userGuid: Joi.string()
            .required()
            .description('the guid for the user'),
    },
};

exports.postResults = {
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
