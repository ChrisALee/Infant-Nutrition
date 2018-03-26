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
            { plugin: 'blipp', options: { showAuth: true } },
            { plugin: 'hapi-swagger', options: swaggerOptions },
            { plugin: 'hapi-redis2', options: redisOptions },
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
