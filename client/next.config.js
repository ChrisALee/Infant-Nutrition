require('dotenv').config();

const withTypescript = require('@zeit/next-typescript');

const prod = process.env.NODE_ENV === 'production';

module.exports = withTypescript({
    publicRuntimeConfig: {
        // Will be available on both server and client
        staticFolder: '/static',
    },
    serverRuntimeConfig: {
        // Will only be available on the server side
        API_HOST: prod ? process.env.API_HOST : 'http://localhost:3001/api',
    },
});
