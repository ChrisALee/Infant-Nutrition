exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('quiz_results')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('quiz_results').insert([
                {
                    quiz_owner: 'a995b47c-b9db-45c5-8255-48ea9d6bba66',
                    user_owner: '4fb12b06-d9b1-4944-ba4d-28e6f74e6cef',
                    score: 1,
                    guid: '4b43392f-6659-4e93-ad08-32d480823915',
                },
            ]);
        });
};
