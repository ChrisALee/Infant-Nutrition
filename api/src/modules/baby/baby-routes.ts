import * as babyHandlers from './baby-handlers';
import * as babyValidators from './baby-validators';

exports.register = (server, options) => {
    server.route({
        path: '/users/{userGuid}/babies',
        method: 'GET',
        config: {
            auth: 'jwt',
            description: 'Get babies',
            notes:
                'Returns baby items for the user with the userGuid passed in the path',
            tags: ['api'],
            validate: babyValidators.getBabies,
        },
        handler: babyHandlers.getBabies,
    });

    server.route({
        path: '/users/{userGuid}/babies',
        method: 'POST',
        config: {
            auth: 'jwt',
            description: 'Post baby',
            notes:
                'Adds a baby to the user specified with the userGuid passed in the path',
            tags: ['api'],
            validate: babyValidators.postBaby,
        },
        handler: babyHandlers.postBaby,
    });
};

exports.name = 'baby';
