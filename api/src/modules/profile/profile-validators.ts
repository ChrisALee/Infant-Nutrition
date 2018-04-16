import * as Joi from 'joi';

export const postProfile = {
    payload: {
        profile: Joi.object()
            .keys({
                name: Joi.string().default(''),
                should_email: Joi.boolean()
                    .required()
                    .default(true),
            })
            .required()
            .description('the user setting body json payload'),
    },
};

export const putProfile = {
    payload: {
        profile: Joi.object()
            .keys({
                name: Joi.string(),
                should_email: Joi.boolean(),
            })
            .required()
            .description('the profile body json payload'),
    },
};
