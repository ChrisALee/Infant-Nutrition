import * as Joi from 'joi';

export const getUserSettings = {
    params: {
        userGuid: Joi.string()
            .required()
            .description('the guid for the user'),
    },
};

export const postUserSettings = {
    params: {
        userGuid: Joi.string()
            .required()
            .description('the guid for the user'),
    },
    payload: {
        user_settings: Joi.object()
            .keys({
                should_email: Joi.boolean().required(),
            })
            .required()
            .description('the user setting body json payload'),
    },
};

export const putUserSettings = {
    params: {
        userSettingsGuid: Joi.string()
            .required()
            .description('the guid for the user settings'),
        userGuid: Joi.string()
            .required()
            .description('the guid for the user'),
    },
    payload: {
        user_settings: Joi.object()
            .keys({
                should_email: Joi.boolean().required(),
            })
            .required()
            .description('the user setting body json payload'),
    },
};
