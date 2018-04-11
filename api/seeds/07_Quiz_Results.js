exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('quiz_results').then(function() {
        // Inserts seed entries
        return knex('quiz_results').insert([
            {
                quiz_guid: 'DnZhL8bnC0',
                user_guid: 'GHso99ia1P',
                score: 1,
                guid: 'FEw9fCNcwx',
            },
        ]);
    });
};
