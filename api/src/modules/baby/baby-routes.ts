import * as babyHandlers from './baby-handlers';
import * as babyValidators from './baby-validators';

exports.register = (server, options) => {
    server.route({
        path: '/users/current/babies',
        method: 'GET',
        config: {
            auth: 'jwt',
            description: 'Get babies from the current user',
            notes: 'Returns baby items for the current user',
            tags: ['api', 'babies'],
        },
        handler: babyHandlers.getBabies,
    });

    server.route({
        path: '/users/current/babies',
        method: 'POST',
        config: {
            auth: 'jwt',
            description: 'Add baby to the current user',
            notes: 'Adds a baby to the user for the current user',
            tags: ['api', 'babies'],
            validate: babyValidators.postBaby,
        },
        handler: babyHandlers.postBaby,
    });
};

exports.name = 'baby';
