const Server = require('./app.ts');

const startServer = async () => {
    try {
        await Server.deployment(true);
    } catch (err) {
        throw err;
    }
};

startServer();
