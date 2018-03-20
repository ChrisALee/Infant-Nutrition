exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('babies')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('babies').insert([
                {
                    owner: '4fb12b06-d9b1-4944-ba4d-28e6f74e6cef',
                    name: 'Ryan',
                    age: 2,
                    guid: 'e21c8531-0b1d-429a-a603-4c17afb682e3',
                },
                {
                    owner: 'cc08ac29-4a3a-4aa1-8bc2-f4b683c85a6d',
                    name: 'Gerbil',
                    age: 23,
                    guid: '065d3c26-8f12-44e3-86ea-e498c4b46eeb',
                },
                {
                    owner: '3dc2373c-4591-4940-86da-0315a7f10857',
                    name: 'Monsoon',
                    age: 5,
                    guid: '27f0c0ea-f07e-4527-8f2e-21a548c6cdc7',
                },
            ]);
        });
};
