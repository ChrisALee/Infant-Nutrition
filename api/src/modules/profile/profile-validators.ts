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
    params: {
        profileGuid: Joi.string()
            .required()
            .description('the guid for the profile'),
    },
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
