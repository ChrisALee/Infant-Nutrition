require('dotenv').config();

const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ANALYZE } = process.env;

const prod = process.env.NODE_ENV === 'production';

module.exports = withTypescript({
    webpack(config, options) {
        // Do not run type checking twice:
        if (options.isServer)
            config.plugins.push(new ForkTsCheckerWebpackPlugin());

        if (ANALYZE) {
            config.plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: 'server',
                    analyzerPort: options.isServer ? 8888 : 8889,
                    openAnalyzer: true,
                }),
            );
        }

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
