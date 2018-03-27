import { deployment } from '../app.js';
import * as redis from 'ioredis-mock';
import * as knex from 'knex';

const NodeEnvironment = require('jest-environment-node');

require('dotenv').config();

class TestEnvironment extends NodeEnvironment {
    Knex = knex({
        client: 'pg',
        connection: {
            host: process.env.MOCK_PG_HOST,
            user: process.env.MOCK_PG_USER,
            password: process.env.MOCK_PG_PASS,
            database: process.env.MOCK_PG_DB,
        },
    });

    async setup() {
        // Suppress good-console warnings during tests
        process.stdout.setMaxListeners(Infinity);

        // Set up knex db using sqlite for mock-knex

        try {
            await super.setup();

            // Migrate and seed the test DB
            await this.Knex.migrate.latest();
            await this.Knex.seed.run();

            // Setup mocked Redis and Knex server and make it global in the test environment
            this.global['Redis'] = await new redis();
            this.global['Knex'] = this.Knex;

            // Set it up for non-test files too
            global['Redis'] = this.global['Redis'];
            global['Knex'] = this.global['Knex'];

            // Setup server and make it global in the test environment
            this.global['server'] = await deployment(false);
        } catch (err) {
            throw err;
        }
    }

    async teardown() {
        try {
            // Tear down Knex data
            await this.global['Knex'].migrate.rollback();

            // Tear down Redis session data and quit connection
            await this.global['Redis'].flushdb();
            await this.global['Redis'].quit();

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
