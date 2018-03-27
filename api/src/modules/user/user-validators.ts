import * as Joi from 'joi';

export const postUser = {
    payload: {
        user: Joi.object()
            .keys({
                username: Joi.string().required(),
                password: Joi.string().required(),
                email: Joi.string().required(),
            })
            .required()
            .description('the user body json payload'),
    },
};
