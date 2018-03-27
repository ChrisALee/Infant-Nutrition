import * as Joi from 'joi';

export const postSession = {
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
