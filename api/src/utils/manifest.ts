const prod = process.env.NODE_ENV === 'production';

const swaggerOptions = {
    info: {
        title: 'Infant Nutrition API documentation',
        description:
            'This is the documentation for the infant nutrition feeding API',
    },
    grouping: 'tags',
    sortTags: 'name',
    securityDefinitions: {
        jwt: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
        },
    },
    security: [{ jwt: [] }],
};

// Should only report to console during development environment
const getGoodOptions = () => {
    if (
        process.env.NODE_ENV === 'production' ||
        process.env.NODE_ENV === 'test'
    ) {
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

const manifest = {
    server: {
        host: process.env.SERVER_HOST,
        port: process.env.SERVER_PORT,
        routes: {
            cors: {
                origin: prod ? [process.env.PROD_CORS_DOMAIN_CLIENT] : ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with'],
                // additionalHeaders: [
                //     'access-control-allow-headers',
                //     'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, CORRELATION_ID',
                // ],
                credentials: true,
            },
        },
    },
    register: {
        plugins: [
            { plugin: require('hapi-auth-jwt2') },
            { plugin: 'inert' },
            { plugin: 'vision' },
            { plugin: 'good', options: goodOptions },
            { plugin: 'blipp', options: { showAuth: true } },
            { plugin: 'hapi-swagger', options: swaggerOptions },
            { plugin: 'hapi-dev-errors', options: devErrorsOptions },
            { plugin: './utils/strategy' },
            { plugin: './utils/cookies' },
            {
                plugin: './modules/session/session-routes',
                routes: { prefix: '/api' },
            },
            {
                plugin: './modules/baby/baby-routes',
                routes: { prefix: '/api' },
            },
            {
                plugin: './modules/quiz/quiz-routes',
                routes: { prefix: '/api' },
            },
            {
                plugin: './modules/profile/profile-routes',
                routes: { prefix: '/api' },
            },
            {
                plugin: './modules/user/user-routes',
                routes: { prefix: '/api' },
            },
            {
                plugin: './modules/content/content-routes',
                routes: { prefix: '/api' },
            },
        ],
    },
};

export default manifest;
