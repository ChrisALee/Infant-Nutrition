const userSettingsHandlers = require('./user-settings-handlers');
const userSettingsValidators = require('./user-settings-validators');

exports.register = (server, options) => {
    server.route({
        path: '/users/{userGuid}/user-settings',
        method: 'GET',
        config: {
            auth: 'jwt',
            description: 'Get user settings',
            notes:
                'Returns user setting items for the user with the userGuid passed in the path',
            tags: ['api'],
            validate: userSettingsValidators.getUserSettings,
        },
        handler: userSettingsHandlers.getUserSettings,
    });

    server.route({
        path: '/users/{userGuid}/user-settings',
        method: 'POST',
        config: {
            auth: 'jwt',
            description: 'Post user settings',
            notes: 'Adds user settings for the user with the userGuid',
            tags: ['api'],
            validate: userSettingsValidators.postUserSettings,
        },
        handler: userSettingsHandlers.postUserSettings,
    });
    server.route({
        path: '/users/{userGuid}/user-settings/{userSettingsGuid}',
        method: 'PUT',
        config: {
            auth: 'jwt',
            description: 'Put user settings',
            notes: 'Updates user settings for the user with the userGuid',
            tags: ['api'],
            validate: userSettingsValidators.putUserSettings,
            pre: [userSettingsHandlers.prePutUserSettings],
        },
        handler: userSettingsHandlers.putUserSettings,
    });
};

exports.name = 'user-settings';
