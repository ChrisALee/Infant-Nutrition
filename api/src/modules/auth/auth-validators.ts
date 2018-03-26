import * as Joi from 'joi';

export const login = {
    payload: {
        user: Joi.object()
            .keys({
                username: Joi.string().required(),
                password: Joi.string().required(),
            })
            .required()
            .description('the user body json payload'),
    },
};

export const register = {
    payload: {
        user: Joi.object()
            .keys({
                username: Joi.string().required(),
                password: Joi.string().required(),
                name: Joi.string().required(),
                email: Joi.string().required(),
            })
            .required()
            .description('the user body json payload'),
    },
};
