import * as Hapi from 'hapi';
import * as Glue from 'glue';
import * as JWT from 'jsonwebtoken';

const manifest = require('./utils/manifest');

require('dotenv').config();

const options = {
    relativeTo: __dirname,
};

const startServer = async () => {
    try {
        // load plugins from ./utils/manifest.ts
        const server = await Glue.compose(manifest, options);

        await server.start();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();
