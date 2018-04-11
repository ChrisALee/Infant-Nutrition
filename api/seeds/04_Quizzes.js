exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('quizzes').then(function() {
        // Inserts seed entries
        return knex('quizzes').insert([
            {
                name: 'General Quiz',
                num_questions: 20,
                guid: 'DnZhL8bnC0',
            },
        ]);
    });
};
