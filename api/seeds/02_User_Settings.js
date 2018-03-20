exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('user_settings')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('user_settings').insert([
                {
                    owner: '4fb12b06-d9b1-4944-ba4d-28e6f74e6cef',
                    should_email: true,
                    guid: '224bb028-a4ad-4042-8ae9-dead455659d1',
                },
                {
                    owner: 'cc08ac29-4a3a-4aa1-8bc2-f4b683c85a6d',
                    should_email: true,
                    guid: '0ed87cee-d8e9-4979-8ce7-1c1331df8212',
                },
                {
                    owner: '3dc2373c-4591-4940-86da-0315a7f10857',
                    should_email: false,
                    guid: '1bd68a27-92a1-496e-a7e9-bc17d135c129',
                },
            ]);
        });
};
