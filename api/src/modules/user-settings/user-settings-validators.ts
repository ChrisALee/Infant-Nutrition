import * as Joi from 'joi';

exports.getUserSettings = {
    params: {
        userGuid: Joi.string()
            .required()
            .description('the guid for the user'),
    },
};

exports.postUserSettings = {
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

exports.putUserSettings = {
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
