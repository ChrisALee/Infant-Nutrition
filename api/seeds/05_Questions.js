exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('questions')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('questions').insert([
                {
                    owner: 'a995b47c-b9db-45c5-8255-48ea9d6bba66',
                    question: 'What is 1+1?',
                    guid: 'd83ee03c-c233-47d3-b854-d6de6f575170',
                },
                {
                    owner: 'a995b47c-b9db-45c5-8255-48ea9d6bba66',
                    question: 'What is 21+1?',
                    guid: 'a6205887-e422-4492-bd00-e51158926d07',
                },
                {
                    owner: 'ef5290cb-b141-47f8-8502-c0e62cdadccb',
                    question: 'What is 2/1?',
                    guid: '29af0fdf-f0c5-46ad-8b1b-ef77a6dc8461',
                },
                {
                    owner: 'ef5290cb-b141-47f8-8502-c0e62cdadccb',
                    question: 'What is 5*5?',
                    guid: 'b401e525-7754-4340-901f-b34f6fedb965',
                },
            ]);
        });
};
