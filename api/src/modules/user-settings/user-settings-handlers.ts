import Knex from '../../utils/knex';
import * as Hapi from 'hapi';
import nanoid = require('nanoid');
import url = require('nanoid/url');
import generate = require('nanoid/generate');

exports.getUserSettings = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { userGuid }: any = request.params;
        const { authGuid }: any = request.auth.credentials;

        if (authGuid !== userGuid) {
            return {
                error: true,
                errMessage: 'Invalid user',
            };
        }

        const results = await Knex('user_settings')
            .where({
                owner: userGuid,
            })
            .select('should_email');

        if (!results || results.length === 0) {
            return {
                error: true,
                errMessage: 'no user settings found',
            };
        }

        return results;
    } catch (err) {
        console.log(err);
        return err;
    }
};

exports.postUserSettings = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { userGuid }: any = request.params;
        const { user_settings }: any = request.payload;
        const { authGuid }: any = request.auth.credentials;

        if (authGuid !== userGuid) {
            return {
                error: true,
                errMessage: 'Invalid user',
            };
        }

        const guid = generate(url, 10);

        const insertOperation = await Knex('user_settings').insert({
            owner: userGuid,
            should_email: user_settings.should_email,
            guid,
        });

        return {
            data: guid,
            message: 'successfully created user settings',
        };
    } catch (err) {
        console.log(err);
        return err;
    }
};

exports.putUserSettings = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { userSettingsGuid }: any = request.params;
        const { user_settings }: any = request.payload;
        const { userGuid }: any = request.params;
        const { authGuid }: any = request.auth.credentials;

        if (authGuid !== userGuid) {
            return {
                error: true,
                errMessage: 'Invalid user',
            };
        }

        const insertOperation = await Knex('user_settings')
            .where({
                guid: userSettingsGuid,
            })
            .update({
                should_email: user_settings.should_email,
            });

        return {
            message: 'successfully updated user settings',
        };
    } catch (err) {
        console.log(err);
        return err;
    }
};

exports.prePutUserSettings = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    const { userSettingsGuid } = request.params;

    const results = await Knex('user_settings')
        .where({
            guid: userSettingsGuid,
        })
        .select('owner');

    if (!results) {
        return {
            error: true,
            errMessage: `the user_settings with id ${userSettingsGuid} was not found`,
        };
    }
    return 'success';
};
