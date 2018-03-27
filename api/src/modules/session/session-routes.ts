import * as sessionHandlers from './session-handlers';
import * as sessionValidators from './session-validators';

exports.register = (server, options) => {
    server.route({
        path: '/session',
        method: 'POST',
        config: {
            auth: false,
            description: 'Log user in',
            notes:
                'Creates session and returns JWT in Auth Header.' +
                ' Note that it only accepts email OR username but NOT BOTH.',
            tags: ['api', 'session'],
            validate: sessionValidators.postSession,
        },
        handler: sessionHandlers.postSession,
    });

    server.route({
        path: '/session',
        method: 'DELETE',
        config: {
            auth: 'jwt',
            description: 'Log user out',
            notes: 'Destroys session and invalidates JWT',
            tags: ['api', 'session'],
        },
        handler: sessionHandlers.deleteSession,
    });
};

exports.name = 'session';
