import Knex from './knex';
import * as Hapi from 'hapi';

// TODO: Use env var for host/port
const server: any = new Hapi.Server({
    host: 'localhost',
    port: 3001,
});

// TODO: Code out auth and use async/await
// server.register(require('hapi-auth-jwt'), err => {
//     server.auth.strategy('token', 'jwt', {
//         key: process.env.JWT_KEY,

//         verifyOptions: {
//             algorithms: ['HS256'],
//         },
//     });
// });

// --------------
// Routes
// --------------
// TODO: Separate into new folder
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

// TODO: Use env var for host
// Start the server
(async () => {
    try {
        await server.start(); // boots your server
    } catch (err) {
        console.log(err);
    }
    console.log('Now Visit: http://localhost:' + server.info.port);
})();
