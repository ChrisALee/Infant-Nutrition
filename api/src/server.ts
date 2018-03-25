const Server = require('./app');

const startServer = async () => {
    try {
        await Server.deployment(true);
    } catch (err) {
        throw err;
    }
};

startServer();
