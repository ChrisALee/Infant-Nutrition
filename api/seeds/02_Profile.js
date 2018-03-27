exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('profile').then(function() {
        // Inserts seed entries
        return knex('profile').insert([
            {
                owner: 'GHso99ia1P',
                name: 'Chris Lee',
                should_email: true,
                guid: 'FyHn1MzTWD',
            },
            {
                owner: '8dDeBulp2U',
                name: 'Andrew Borg',
                should_email: true,
                guid: 's1MyaccnMQ',
            },
            {
                owner: '0scyzGE9XJ',
                name: 'James Kahn',
                should_email: false,
                guid: 'R0lDc2sllc',
            },
        ]);
    });
};
