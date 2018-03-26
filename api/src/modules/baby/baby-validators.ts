import * as Joi from 'joi';

export const getBabies = {
    params: {
        userGuid: Joi.string()
            .required()
            .description('the guid for the user'),
    },
};

export const postBaby = {
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
