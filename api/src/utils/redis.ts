require('dotenv').config();

let Redis;

if (process.env.NODE_ENV !== 'test') {
    Redis = require('ioredis')({
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASS,
        db: process.env.REDIS_DB,
    });
} else {
    // Pulls from Test Environment setup file
    Redis = global['Redis'];
}

export default Redis;
