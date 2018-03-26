import { deployment } from './app';

const startServer = async () => {
    try {
        await deployment(true);
    } catch (err) {
        throw err;
    }
};

startServer();
