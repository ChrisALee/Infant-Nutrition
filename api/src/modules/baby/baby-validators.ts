import * as Joi from 'joi';

exports.getBabies = {
    params: {
        userGuid: Joi.string()
            .required()
            .description('the guid for the user'),
    },
};

exports.postBaby = {
    params: {
        userGuid: Joi.string()
            .required()
            .description('the guid for the user'),
    },
    payload: {
        baby: Joi.object()
            .keys({
                name: Joi.string().required(),
                age: Joi.number()
                    .integer()
                    .min(0)
                    .max(1000)
                    .required(),
            })
            .required()
            .description('the baby body json payload'),
    },
};
