import * as Boom from 'boom';
import * as Hapi from 'hapi';
import generate = require('nanoid/generate');
import url = require('nanoid/url');

import Knex from '../../utils/knex';

export const getProfile = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { userGuid }: any = request.auth.credentials;

        const results = await Knex('profile')
            .where({
                owner: userGuid,
            })
            .select('should_email', 'name');

        if (!results || results.length === 0) {
            return {
                error: true,
                errMessage: 'no profile found',
            };
        }

        return results;
    } catch (err) {
        request.log('api', err);
        throw Boom.internal('Internal database error');
    }
};

export const postProfile = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { profile }: any = request.payload;
        const { userGuid }: any = request.auth.credentials;

        const guid = generate(url, 10);

        const insertOperation = await Knex('profile').insert({
            user_guid: userGuid,
            name: profile.name,
            should_email: profile.should_email,
            guid,
        });

        return {
            data: guid,
            message: 'successfully created profile',
        };
    } catch (err) {
        request.log('api', err);
        throw Boom.internal('Internal database error');
    }
};

export const putProfile = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { profileGuid }: any = request.params;
        const { profile }: any = request.payload;
        const { userGuid }: any = request.auth.credentials;

        const insertOperation = await Knex('profile')
            .where({
                guid: profileGuid,
            })
            .update({
                name: profile.name,
                should_email: profile.should_email,
            });

        return {
            message: 'successfully updated profile',
        };
    } catch (err) {
        request.log('api', err);
        throw Boom.internal('Internal database error');
    }
};

export const prePutProfile = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { profileGuid } = request.params;

        const results = await Knex('profile')
            .where({
                guid: profileGuid,
            })
            .select('user_guid');

        if (!results) {
            throw new Error(`the profile with id ${profileGuid} was not found`);
        }

        return 'success';
    } catch (err) {
        request.log('api', err);
        throw Boom.notFound(err);
    }
};
