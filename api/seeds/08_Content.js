exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('content').then(function() {
        // Inserts seed entries
        return knex('content').insert([
            {
                content_type: 'private',
                content_location: 'private',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'FEw9fkNcwx',
            },
        ]);
    });
};
