import Knex from './knex';
import * as Bcrypt from 'bcrypt';
import * as Hapi from 'hapi';

import routes from './routes';

// TODO: bring your own validation function
const validate = async (request, username, password) => {
    if (!request.username) {
        return { credentials: null, isValid: false };
    }

    const isValid = await Bcrypt.compare(password, request.password);
    const credentials = { id: request.id, name: request.name };

    return { isValid, credentials };
};

// TODO: Use env var for host
// Start the server
(async () => {
    // TODO: Use env var for host/port
    const server: Hapi.Server = new Hapi.Server({
        host: 'localhost',
        port: 3001,
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
    console.log('Now Visit: http://localhost:' + server.info.port);
})();
