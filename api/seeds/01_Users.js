exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                {
                    name: 'Chris Lee',
                    username: 'clee',
                    password: 'password',
                    email: 'clee@gmail.com',
                    guid: '4fb12b06-d9b1-4944-ba4d-28e6f74e6cef',
                },
                {
                    name: 'Andrew Borg',
                    username: 'aborg',
                    password: 'password123',
                    email: 'aborg@gmail.com',
                    guid: 'cc08ac29-4a3a-4aa1-8bc2-f4b683c85a6d',
                },
                {
                    name: 'James Kahn',
                    username: 'jkahn',
                    password: '123password',
                    email: 'jkahn@gmail.com',
                    guid: '3dc2373c-4591-4940-86da-0315a7f10857',
                },
            ]);
        });
};
