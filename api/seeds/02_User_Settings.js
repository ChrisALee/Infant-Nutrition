exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('user_settings').then(function() {
        // Inserts seed entries
        return knex('user_settings').insert([
            {
                owner: 'GHso99ia1P',
                should_email: true,
                guid: 'FyHn1MzTWD',
            },
            {
                owner: '8dDeBulp2U',
                should_email: true,
                guid: 's1MyaccnMQ',
            },
            {
                owner: '0scyzGE9XJ',
                should_email: false,
                guid: 'R0lDc2sllc',
            },
        ]);
    });
};
