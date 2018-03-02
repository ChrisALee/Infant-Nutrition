import Knex from './knex';
import * as Hapi from 'hapi';

const server: any = new Hapi.Server({
    host: 'localhost',
    port: 3001,
});

server.register(require('hapi-auth-jwt'), err => {
    server.auth.strategy('token', 'jwt', {
        key: process.env.JWT_KEY,

        verifyOptions: {
            algorithms: ['HS256'],
        },
    });
});

// --------------
// Routes
// --------------

server.route({
    path: '/birds',
    method: 'GET',
    handler: async (request, h) => {
        try {
            const results = await Knex('birds')
                .where({
                    isPublic: true,
                })
                .select('name', 'species', 'picture_url');
            if (!results || results.length === 0) {
                return {
                    error: true,
                    errMessage: 'no public bird found',
                };
            }
            return {
                dataCount: results.length,
                data: results,
            };
        } catch (err) {
            console.log(err);
            return 'err';
        }
    },
});
startServer();
async function startServer() {
    try {
        await server.start(); // boots your server
    } catch (err) {
        console.log(err);
    }
    console.log('Now Visit: http://localhost:' + server.info.port);
}
