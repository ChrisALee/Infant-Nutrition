require('dotenv').config();

export default require('knex')({
    client: process.env.DB_TYPE,
    connection: {
        host: process.env.DB_HOST,

        user: process.env.DB_USER,
        password: process.env.DB_PASS,

        database: process.env.DB,
        charset: 'utf8',
    },
});
