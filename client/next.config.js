require('dotenv').config();

const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

module.exports = withTypescript({
    webpack(config, options) {
        // Do not run type checking twice:
        if (options.isServer)
            config.plugins.push(new ForkTsCheckerWebpackPlugin());

        return config;
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        API_HOST: prod ? process.env.API_HOST : process.env.API_HOST_DEV,
        staticFolder: '/static',
    },
    serverRuntimeConfig: {
        // Will only be available on the server side
    },
});
