import { deployment } from '../app.js';
import * as redisTear from 'redis';

const NodeEnvironment = require('jest-environment-node');

require('dotenv').config();

class TestEnvironment extends NodeEnvironment {
    async setup() {
        // Suppress good-console warnings during tests
        process.stdout.setMaxListeners(Infinity);

        try {
            await super.setup();

            // Setup server and make it global in the test environment
            this.global.server = await deployment(false);
        } catch (err) {
            throw err;
        }
    }

    async teardown() {
        try {
            const redisClientTear = await redisTear.createClient(
                `redis://:${process.env.REDIS_PASS}@${process.env.REDIS_HOST}:${
                    process.env.REDIS_PORT
                }/${process.env.REDIS_DB}`,
            );
            // Tear down Redis user data
            await redisClientTear.FLUSHDB();

            redisClientTear.quit();

            await super.teardown();
        } catch (err) {
            throw err;
        }
    }

    runScript(script) {
        return super.runScript(script);
    }
}

module.exports = TestEnvironment;
