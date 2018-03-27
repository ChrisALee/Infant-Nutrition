require('dotenv').config();

let Redis;

if (process.env.NODE_ENV !== 'test') {
    Redis = require('ioredis')({
        port: process.env.REDIS_DB_PORT || 6379,
        host: process.env.REDIS_DB_HOST,
        password: process.env.REDIS_DB_PASS,
        db: process.env.REDIS_DB_NAME,
    });
} else {
    // Pulls from Test Environment setup file
    Redis = global['Redis'];
}

export default Redis;
