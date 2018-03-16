exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('quizzes')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('quizzes').insert([
                {
                    name: 'Easy',
                    num_questions: 2,
                    guid: 'a995b47c-b9db-45c5-8255-48ea9d6bba66',
                },
                {
                    name: 'Hard',
                    num_questions: 2,
                    guid: 'ef5290cb-b141-47f8-8502-c0e62cdadccb',
                },
            ]);
        });
};
