import Knex from './knex';
import * as Hapi from 'hapi';
import * as Inert from 'inert';
import * as Vision from 'vision';
import * as Blipp from 'blipp';
import * as HapiSwagger from 'hapi-swagger';
import * as JWT from 'jsonwebtoken';
import * as redis from 'redis';
import * as HapiRedis from 'hapi-redis2';

import routes from './routes';
const Pack = require('../package');

require('dotenv').config();

const swaggerOptions = {
    info: {
        title: 'API documentation',
        description:
            'This is the documentation for the infant nutrition feeding API',
        version: Pack.version,
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
        db: 0,
    },
    decorate: true,
};

const validate = async (decoded, request, h) => {
    if (!decoded.guid) {
        return { credentials: null, isValid: false };
    }

    console.log(' - - - - - - - decoded token - - - - - - -');
    console.log(decoded);

    const redisClient = request.redis.client;
    try {
        var redisResult = await redisClient.get(decoded.guid);
    } catch (err) {
        // throw Boom.internal('Internal Redis error);
        throw err;
    }

    if (redisResult) {
        var session = JSON.parse(redisResult);
    } else {
        return { credentials: null, isValid: false };
    }

    if (session.valid === true) {
        const credentials = {
            guid: decoded.guid,
            username: decoded.username,
        };
        return { credentials, isValid: true };
    } else {
        return { credentials: null, isValid: false };
    }
};

// Start the server
(async () => {
    const server: Hapi.Server = new Hapi.Server({
        host: process.env.SERVER_HOST,
        port: process.env.SERVER_PORT,
    });

    await server.register([
        require('hapi-auth-jwt2'),
        Inert,
        Vision,
        {
            plugin: Blipp,
            options: { showAuth: true },
        },
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
        {
            plugin: HapiRedis,
            options: redisOptions,
        },
    ]);

    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_KEY, // Never Share your secret key
        validate,
        verifyOptions: { algorithms: ['HS256'] }, // pick a strong algorithm
    });

    server.auth.default('jwt');

    routes.forEach(route => {
        server.route(route);
    });

    try {
        await server.start(); // boots your server
    } catch (err) {
        console.log(err);
    }
})();
