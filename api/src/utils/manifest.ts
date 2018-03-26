import { RedisClient } from 'redis';

require('dotenv').config();

const swaggerOptions = {
    info: {
        title: 'API documentation',
        description:
            'This is the documentation for the infant nutrition feeding API',
    },
    securityDefinitions: {
        jwt: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
        },
    },
    security: [{ jwt: [] }],
};

const redisOptions = {
    settings: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASS,
        db: process.env.REDIS_DB,
    },
    decorate: true,
};

const getGoodOptions = () => {
    if (process.env.NODE_ENV === 'production') {
        return {
            ops: false,
            reporters: {},
        };
    } else {
        return {
            ops: {
                interval: 1000,
            },
            reporters: {
                myConsoleReporter: [
                    {
                        module: 'good-squeeze',
                        name: 'Squeeze',
                        args: [{ log: '*', response: '*', request: '*' }],
                    },
                    {
                        module: 'good-console',
                    },
                    'stdout',
                ],
            },
        };
    }
};

const goodOptions = getGoodOptions();

const devErrorsOptions = {
    showErrors: process.env.NODE_ENV !== 'production',
    useYouch: true,
};

module.exports = {
    server: {
        host: process.env.SERVER_HOST,
        port: process.env.SERVER_PORT,
    },
    register: {
        plugins: [
            { plugin: require('hapi-auth-jwt2') },
            { plugin: 'inert' },
            { plugin: 'vision' },
            { plugin: 'good', options: goodOptions },
            { plugin: 'blipp', options: { showAuth: true } },
            { plugin: 'hapi-swagger', options: swaggerOptions },
            { plugin: 'hapi-redis2', options: redisOptions },
            { plugin: 'hapi-dev-errors', options: devErrorsOptions },
            { plugin: './utils/strategy' },
            { plugin: './utils/cookies' },
            {
                plugin: './modules/auth/auth-routes',
                routes: { prefix: '/auth' },
            },
            {
                plugin: './modules/baby/baby-routes',
                routes: { prefix: '/api/v1' },
            },
            {
                plugin: './modules/quiz/quiz-routes',
                routes: { prefix: '/api/v1' },
            },
            {
                plugin: './modules/user-settings/user-settings-routes',
                routes: { prefix: '/api/v1' },
            },
        ],
    },
};
