import * as contentHandlers from './content-handlers';
import * as contentValidators from './content-validators';

exports.register = (server, options) => {
    server.route({
        path: '/content',
        method: 'GET',
        config: {
            auth: false,
            description: 'Get all content',
            notes: 'Returns all the content posts in the database',
            tags: ['api', 'content'],
            validate: contentValidators.getAllContent,
        },
        handler: contentHandlers.getAllContent,
    });

    server.route({
        path: '/content/{contentGuid}',
        method: 'GET',
        config: {
            auth: false,
            description: 'Get single content post',
            notes:
                'Returns the content post with the supplied guid in the database',
            tags: ['api', 'content'],
        },
        handler: contentHandlers.getSingleContent,
    });

    server.route({
        path: '/content',
        method: 'POST',
        config: {
            auth: 'jwt',
            description: 'Add a single content post',
            notes: 'Adds a content to the database',
            tags: ['api', 'content'],
            validate: contentValidators.postContent,
        },
        handler: contentHandlers.postContent,
    });

    server.route({
        path: '/content/{contentGuid}',
        method: 'PUT',
        config: {
            auth: 'jwt',
            description: 'Update a single content post',
            notes: 'Updates a content to the database',
            tags: ['api', 'content'],
            validate: contentValidators.putContent,
            pre: [contentHandlers.prePutContent],
        },
        handler: contentHandlers.putContent,
    });
};

exports.name = 'content';
