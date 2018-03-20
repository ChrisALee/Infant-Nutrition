exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('answers')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('answers').insert([
                {
                    owner: 'd83ee03c-c233-47d3-b854-d6de6f575170',
                    answer: '2',
                    is_correct: true,
                    guid: 'd1e400c4-c58b-4ca9-89f5-274734cd9083',
                },
                {
                    owner: 'd83ee03c-c233-47d3-b854-d6de6f575170',
                    answer: '5',
                    is_correct: false,
                    guid: '5e17daea-9094-4ca7-9f19-6f9bfc002de1',
                },
                {
                    owner: 'a6205887-e422-4492-bd00-e51158926d07',
                    answer: '10',
                    is_correct: false,
                    guid: 'be734b1e-665b-41ff-82a0-1a713a7b04f3',
                },
                {
                    owner: 'a6205887-e422-4492-bd00-e51158926d07',
                    answer: '22',
                    is_correct: true,
                    guid: 'e4c47b70-e16c-4dfb-9819-5f9e08eb7388',
                },
                {
                    owner: '29af0fdf-f0c5-46ad-8b1b-ef77a6dc8461',
                    answer: '2',
                    is_correct: true,
                    guid: '35353190-172d-487a-8bc8-480a4671e752',
                },
                {
                    owner: '29af0fdf-f0c5-46ad-8b1b-ef77a6dc8461',
                    answer: '26',
                    is_correct: false,
                    guid: '30732100-2a21-4e1b-a936-4ae79eef3244',
                },
                {
                    owner: 'b401e525-7754-4340-901f-b34f6fedb965',
                    answer: '13',
                    is_correct: false,
                    guid: 'ac15b334-e677-47d6-a2a9-ec6b510df12b',
                },
                {
                    owner: 'b401e525-7754-4340-901f-b34f6fedb965',
                    answer: '25',
                    is_correct: true,
                    guid: '1ee71eee-489d-4f10-ad5c-5f7941109b3c',
                },
            ]);
        });
};
