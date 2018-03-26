const Bcrypt = require('bcrypt');

exports.seed = async function(knex, Promise) {
    // Deletes ALL existing entries
    try {
        await knex.raw(
            'truncate table users, user_settings, babies, answers, questions, quiz_results, quizzes ',
        );

        const pass1 = await Bcrypt.hash('password1', 10);
        const pass2 = await Bcrypt.hash('password2', 10);
        const pass3 = await Bcrypt.hash('password3', 10);

        return knex('users').then(function() {
            // Inserts seed entries
            return knex('users').insert([
                {
                    name: 'Chris Lee',
                    username: 'clee',
                    password: pass1,
                    email: 'clee@gmail.com',
                    guid: 'GHso99ia1P',
                },
                {
                    name: 'Andrew Borg',
                    username: 'aborg',
                    password: 'password123',
                    password: pass2,
                    email: 'aborg@gmail.com',
                    guid: '8dDeBulp2U',
                },
                {
                    name: 'James Kahn',
                    username: 'jkahn',
                    password: pass3,
                    email: 'jkahn@gmail.com',
                    guid: '0scyzGE9XJ',
                },
            ]);
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
};
