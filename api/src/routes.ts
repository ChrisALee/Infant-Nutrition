import Knex from './knex';
import * as Hapi from 'hapi';

const routes = [
    {
        path: '/birds',
        method: 'GET',
        config: { auth: false },
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
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
    },
];

export default routes;
