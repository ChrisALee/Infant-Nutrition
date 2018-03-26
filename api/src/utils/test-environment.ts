import { deployment } from '../app.js';

const NodeEnvironment = require('jest-environment-node');

class TestEnvironment extends NodeEnvironment {
    async setup() {
        try {
            await super.setup();
            this.global.server = await deployment(false);
        } catch (err) {
            throw err;
        }
    }

    async teardown() {
        await super.teardown();
    }

    runScript(script) {
        return super.runScript(script);
    }
}

module.exports = TestEnvironment;
