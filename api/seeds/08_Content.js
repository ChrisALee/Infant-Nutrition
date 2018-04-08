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
            {
                content_type: 'title',
                content_location: 'index',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'Fkw9fkNcwx',
            },
            {
                content_type: 'newborn',
                content_location: 'babyInfo',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database Newborn","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'Fkw9fklcwx',
            },
            {
                content_type: 'pushingUp',
                content_location: 'babyInfo',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database for Pushing Up","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'Fkw2fklcwx',
            },
            {
                content_type: 'learningToSit',
                content_location: 'babyInfo',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database for Learning To Sit","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'gkw2fklcwx',
            },
            {
                content_type: 'learningToCrawl',
                content_location: 'babyInfo',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database for Learning To Crawl","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'F5w2fklcwx',
            },
            {
                content_type: 'learningToWalk',
                content_location: 'babyInfo',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database for Learning To Walk","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'mkw2fklcwx',
            },
        ]);
    });
};
