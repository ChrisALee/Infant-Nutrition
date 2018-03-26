exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('quizzes').then(function() {
        // Inserts seed entries
        return knex('quizzes').insert([
            {
                name: 'Easy',
                num_questions: 2,
                guid: 'DnZhL8bnC0',
            },
            {
                name: 'Hard',
                num_questions: 2,
                guid: 'WI9g6uzzIz',
            },
        ]);
    });
};
