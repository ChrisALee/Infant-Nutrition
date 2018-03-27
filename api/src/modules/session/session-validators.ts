import * as Joi from 'joi';

export const postSession = {
    payload: {
        user: Joi.object()
            .keys({
                username: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required()
                    .example('OnlyEnterUsernameAndPass'),
                password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
                email: Joi.string()
                    .email()
                    .required()
                    .example('OrOnlyEnterEmailAndPass@email.com'),
            })
            .xor('username', 'email')
            .required()
            .description('the user body json payload'),
    },
};
