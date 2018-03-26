exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('babies').then(function() {
        // Inserts seed entries
        return knex('babies').insert([
            {
                owner: 'GHso99ia1P',
                name: 'Ryan',
                date_of_birth: '2001-10-05',
                guid: 'i5cTVRyKbE',
            },
            {
                owner: '8dDeBulp2U',
                name: 'Gerbil',
                date_of_birth: '2001-10-05',
                guid: 'bWiWGVDY6G',
            },
            {
                owner: '0scyzGE9XJ',
                name: 'Monsoon',
                date_of_birth: '2001-10-05',
                guid: 'fdCuvAX2tx',
            },
        ]);
    });
};
