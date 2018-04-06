import * as Boom from 'boom';
import * as Hapi from 'hapi';
import generate = require('nanoid/generate');
import url = require('nanoid/url');

import Knex from '../../utils/knex';

export const getAllContent = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const results = await Knex('content').select(
            'content_type',
            'content_location',
            'text',
            'guid',
        );

        if (!results || results.length === 0) {
            return {
                error: true,
                errMessage: 'no content posts found',
            };
        }

        return results;
    } catch (err) {
        request.log('api', err);
        throw Boom.internal('Internal database error');
    }
};

export const getSingleContent = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { contentGuid } = request.params;

        const results = await Knex('content')
            .where({
                content_type: contentGuid,
            })
            .select('contentType', 'text');

        if (!results || results.length === 0) {
            return {
                error: true,
                errMessage: 'no content post found',
            };
        }

        return results;
    } catch (err) {
        request.log('api', err);
        throw Boom.internal('Internal database error');
    }
};

export const postContent = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { baby }: any = request.payload;
        const { userGuid }: any = request.auth.credentials;

        const guid = generate(url, 10);

        const insertOperation = await Knex('babies').insert({
            owner: userGuid,
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
