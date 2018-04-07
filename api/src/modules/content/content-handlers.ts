import * as Boom from 'boom';
import * as Hapi from 'hapi';
import generate = require('nanoid/generate');
import url = require('nanoid/url');

import Knex from '../../utils/knex';

export const getAllContent = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    const params: any = request.query;
    let results;
    try {
        if (params && params.contentLocation) {
            results = await Knex('content')
                .where({
                    content_location: params.contentLocation,
                })
                .select('content_type', 'content_location', 'text', 'guid');
        } else {
            results = await Knex('content').select(
                'content_type',
                'content_location',
                'text',
                'guid',
            );
        }
    } catch (err) {
        request.log('api', err);
        throw Boom.internal('Internal database error');
    }

    if (!results || results.length === 0) {
        throw Boom.notFound('No content found');
    }

    const filtered = results.map(item => {
        return {
            contentType: item.content_type,
            contentLocation: item.content_location,
            text: item.text,
            guid: item.guid,
            links: {
                self: `${process.env.SERVER_FULL_URL}/content/${item.guid}`,
            },
        };
    });

    // TODO: Put in utils folder
    const arrayToObject = (arr, keyField) =>
        arr.reduce((obj, item) => ({ ...obj, [item[keyField]]: item }), {});

    const data = arrayToObject(filtered, 'contentType');

    return h
        .response({
            status: 'success',
            type: 'content posts',
            links: {
                self: `${process.env.SERVER_FULL_URL}/content`,
            },
            data,
        })
        .type('application/json');
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

        // TODO: Return better json with self links and whatnot
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
        const { content }: any = request.payload;

        const guid = generate(url, 10);

        const insertOperation = await Knex('content').insert({
            content_type: content.contentType,
            content_location: content.contentLocation,
            text: content.text,
            guid,
        });

        return h
            .response({
                status: 'success',
                type: 'content posts',
                links: {
                    self: `${process.env.SERVER_FULL_URL}/content`,
                },
                data: { ...content, guid },
            })
            .type('application/json')
            .header(
                'Location',
                `${process.env.SERVER_FULL_URL}/content/${guid}`,
            )
            .code(201);
    } catch (err) {
        request.log('api', err);
        throw Boom.internal('Internal database error');
    }
};

export const putContent = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { contentGuid }: any = request.params;
        const { content }: any = request.payload;

        const guid = generate(url, 10);

        const insertOperation = await Knex('content')
            .where({
                guid: contentGuid,
            })
            .update({
                text: content.text,
            });

        return h
            .response({
                status: 'success',
                type: 'content posts',
                links: {
                    self: `${process.env.SERVER_FULL_URL}/content`,
                },
                data: { ...content, guid },
            })
            .type('application/json')
            .header(
                'Location',
                `${process.env.SERVER_FULL_URL}/content/${guid}`,
            )
            .code(200);
    } catch (err) {
        request.log('api', err);
        throw Boom.internal('Internal database error');
    }
};

export const prePutContent = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { contentGuid } = request.params;

        const results = await Knex('profile')
            .where({
                guid: contentGuid,
            })
            .select('guid');

        if (!results) {
            throw new Error(`the content with id ${contentGuid} was not found`);
        }

        return 'success';
    } catch (err) {
        request.log('api', err);
        throw Boom.notFound(err);
    }
};
