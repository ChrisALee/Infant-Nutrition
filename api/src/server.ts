import Knex from './knex';
import * as Bcrypt from 'bcrypt';
import * as Hapi from 'hapi';

import routes from './routes';

require('dotenv').config();

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

    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt', {
        key: 'NeverShareYourSecret', // Never Share your secret key
        validate,
        verifyOptions: { algorithms: ['HS256'] }, // pick a strong algorithm
    });

    server.auth.default('jwt');

    routes.forEach(route => {
        console.log(`attaching ${route.path}`);
        server.route(route);
    });

    try {
        await server.start(); // boots your server
    } catch (err) {
        console.log(err);
    }
    console.log(
        `Now Visit: http://${process.env.SERVER_HOST}:${server.info.port}`,
    );
})();
