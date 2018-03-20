import Knex from './knex';
import * as Bcrypt from 'bcrypt';
import * as Hapi from 'hapi';
import * as Inert from 'inert';
import * as Vision from 'vision';
import * as Blipp from 'blipp';
import * as HapiSwagger from 'hapi-swagger';

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
};

// TODO: bring your own validation function
const validate = async (request, username, password) => {
    if (!request.username) {
        return { credentials: null, isValid: false };
    }

    const isValid = await Bcrypt.compare(password, request.password);
    const credentials = { id: request.id, name: request.name };

    return { isValid, credentials };
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
        Blipp,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ]);

    server.auth.strategy('jwt', 'jwt', {
        key: 'NeverShareYourSecret', // Never Share your secret key
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
