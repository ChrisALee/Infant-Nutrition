import * as userHandlers from './user-handlers';
import * as userValidators from './user-validators';

exports.register = (server, options) => {
    server.route({
        path: '/users',
        method: 'POST',
        config: {
            auth: false,
            description: 'Register new user and log them in',
            notes: 'Registers a new user and logs them in',
            tags: ['api', 'users'],
            validate: userValidators.postUser,
            pre: [userHandlers.prePostUser],
        },
        handler: userHandlers.postUser,
    });
};

exports.name = 'user';
