import * as Joi from 'joi';

exports.login = {
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

exports.registerUser = {
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
