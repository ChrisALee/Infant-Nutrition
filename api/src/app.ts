import * as Glue from 'glue';

const manifest = require('./utils/manifest');

export const deployment = async start => {
    try {
        const server = await Glue.compose(manifest, { relativeTo: __dirname });

        await server.initialize();

        if (!start) {
            return server;
        }

        await server.start();

        console.log(`Server started at ${server.info.uri}`);

        return server;
    } catch (err) {
        throw err;
    }
};
