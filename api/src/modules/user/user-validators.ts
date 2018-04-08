import * as Joi from 'joi';

export const postUser = {
    payload: {
        user: Joi.object()
            .keys({
                username: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required(),
                password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
                email: Joi.string()
                    .email()
                    .required()
                    .example('string@email.com'),
                scope: Joi.array().example(['user']),
            })
            .required()
            .description('the user body json payload'),
    },
};
