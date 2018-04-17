exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('profile').then(function() {
        // Inserts seed entries
        return knex('profile').insert([
            {
                user_guid: 'GHso99ia1P',
                name: 'Chris Lee',
                should_email: true,
                guid: 'FyHn1MzTWD',
            },
            {
                user_guid: '8dDeBulp2U',
                name: 'Andrew Borg',
                should_email: true,
                guid: 's1MyaccnMQ',
            },
            {
                user_guid: '0scyzGE9XJ',
                name: 'James Kahn',
                should_email: false,
                guid: 'R0lDc2sllc',
            },
        ]);
    });
};
