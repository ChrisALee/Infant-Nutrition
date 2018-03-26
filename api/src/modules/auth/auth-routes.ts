import * as authHandlers from './auth-handlers';
import * as authValidators from './auth-validators';

exports.register = (server, options) => {
    server.route({
        path: '/login',
        method: 'POST',
        config: {
            auth: false,
            description: 'Login route',
            notes: 'Authenticates user and returns JWT in Auth Header',
            tags: ['api', 'auth'],
            validate: authValidators.login,
        },
        handler: authHandlers.login,
    });

    server.route({
        path: '/logout',
        method: 'POST',
        config: {
            auth: 'jwt',
            description: 'Logout route',
            notes: 'De-authenticates user and invalidates JWT',
            tags: ['api', 'auth'],
        },
        handler: authHandlers.logout,
    });

    server.route({
        path: '/register',
        method: 'POST',
        config: {
            auth: false,
            description: 'Register route',
            notes: 'Registers a new user and logs them in',
            tags: ['api', 'auth'],
            validate: authValidators.register,
        },
        handler: authHandlers.register,
    });
};

exports.name = 'auth';
