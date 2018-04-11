import * as Boom from 'boom';
import * as Hapi from 'hapi';
import generate = require('nanoid/generate');
import url = require('nanoid/url');

import Knex from '../../utils/knex';

export const getBabies = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { userGuid }: any = request.auth.credentials;

        const results = await Knex('babies')
            .where({
                user_guid: userGuid,
            })
            .select('name', 'date_of_birth');

        if (!results || results.length === 0) {
            return {
                error: true,
                errMessage: 'no babies found',
            };
        }

        return results;
    } catch (err) {
        request.log('api', err);
        throw Boom.internal('Internal database error');
    }
};

export const postBaby = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { baby }: any = request.payload;
        const { userGuid }: any = request.auth.credentials;

        const guid = generate(url, 10);

        const insertOperation = await Knex('babies').insert({
            user_guid: userGuid,
            name: baby.name,
            date_of_birth: baby.dateOfBirth,
            guid,
        });

        return {
            data: guid,
            message: 'successfully created baby',
        };
    } catch (err) {
        request.log('api', err);
        throw Boom.internal('Internal database error');
    }
};
