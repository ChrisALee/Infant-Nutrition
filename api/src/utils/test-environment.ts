const NodeEnvironment = require('jest-environment-node');
const TestServer = require('../app.js');

class TestEnvironment extends NodeEnvironment {
    async setup() {
        try {
            await super.setup();
            this.global.server = await TestServer.deployment();
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
