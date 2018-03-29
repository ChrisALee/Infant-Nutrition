let Knex;

if (process.env.NODE_ENV !== 'test') {
    /* tslint:disable:no-var-requires */
    Knex = require('knex')({
        client: process.env.DB_TYPE,
        connection: {
            host: process.env.DB_HOST,

            user: process.env.DB_USER,
            password: process.env.DB_PASS,

            database: process.env.DB,
            charset: 'utf8',
        },
    });
} else {
    // Pulls from Test Environment setup file
    Knex = global['Knex'];
}

export default Knex;
