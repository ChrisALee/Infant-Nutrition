exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('babies').then(function() {
        // Inserts seed entries
        return knex('babies').insert([
            {
                user_guid: 'GHso99ia1P',
                name: 'Ryan',
                date_of_birth: '2001-10-05',
                guid: 'i5cTVRyKbE',
            },
            {
                user_guid: '8dDeBulp2U',
                name: 'Gerbil',
                date_of_birth: '2001-10-05',
                guid: 'bWiWGVDY6G',
            },
            {
                user_guid: '0scyzGE9XJ',
                name: 'Monsoon',
                date_of_birth: '2001-10-05',
                guid: 'fdCuvAX2tx',
            },
        ]);
    });
};
