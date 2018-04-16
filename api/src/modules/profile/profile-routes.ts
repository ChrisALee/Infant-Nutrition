import * as profileHandlers from './profile-handlers';
import * as profileValidators from './profile-validators';

exports.register = (server, options) => {
    server.route({
        path: '/users/current/profile',
        method: 'GET',
        config: {
            auth: 'jwt',
            description: 'Get profile from the current user',
            notes: 'Returns profile items for the current user',
            tags: ['api', 'profile'],
        },
        handler: profileHandlers.getProfile,
    });

    server.route({
        path: '/users/current/profile',
        method: 'POST',
        config: {
            auth: 'jwt',
            description: 'Add profile to the current user',
            notes: 'Adds profile for the current user',
            tags: ['api', 'profile'],
            validate: profileValidators.postProfile,
        },
        handler: profileHandlers.postProfile,
    });
    server.route({
        path: '/users/current/profile',
        method: 'PUT',
        config: {
            auth: 'jwt',
            description: 'Update profile settings to the current user',
            notes: 'Updates profile for the current user',
            tags: ['api', 'profile'],
            validate: profileValidators.putProfile,
            pre: [profileHandlers.prePutProfile],
        },
        handler: profileHandlers.putProfile,
    });
};

exports.name = 'profile';
