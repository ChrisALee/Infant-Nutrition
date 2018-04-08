exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('content').then(function() {
        // Inserts seed entries
        return knex('content').insert([
            {
                content_type: 'title',
                outer_location: 'private',
                inner_location: 'top',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'FEw9fkNcwx',
            },
            {
                content_type: 'description',
                outer_location: 'private',
                inner_location: 'top',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'FEw9fkNcw4',
            },
            {
                content_type: 'title',
                outer_location: 'index',
                inner_location: 'top',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'Fkw9fkNcwx',
            },
            {
                content_type: 'newborn',
                outer_location: 'index',
                inner_location: 'babySummary',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database for Newborn summary","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'mkw5fklcwx',
            },
            {
                content_type: 'pushingUp',
                outer_location: 'index',
                inner_location: 'babySummary',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database for Pushing Up","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'Fkw2fklcwz',
            },
            {
                content_type: 'learningToSit',
                outer_location: 'index',
                inner_location: 'babySummary',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database for Learning To Sit","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'gkw27klcwx',
            },
            {
                content_type: 'learningToCrawl',
                outer_location: 'index',
                inner_location: 'babySummary',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database for Learning To Crawl","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'F5w2fkl1wx',
            },
            {
                content_type: 'learningToWalk',
                outer_location: 'index',
                inner_location: 'babySummary',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database for Learning To Walk","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'mkw2fklcnx',
            },
            {
                content_type: 'newborn',
                outer_location: 'index',
                inner_location: 'babyInfo',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database Newborn","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'Fkw9fklcwx',
            },
            {
                content_type: 'pushingUp',
                outer_location: 'index',
                inner_location: 'babyInfo',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database for Pushing Up","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'Fkw2fklcwx',
            },
            {
                content_type: 'learningToSit',
                outer_location: 'index',
                inner_location: 'babyInfo',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database for Learning To Sit","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'gkw2fklcwx',
            },
            {
                content_type: 'learningToCrawl',
                outer_location: 'index',
                inner_location: 'babyInfo',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database for Learning To Crawl","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'F5w2fklcwx',
            },
            {
                content_type: 'learningToWalk',
                outer_location: 'index',
                inner_location: 'babyInfo',
                text:
                    '{"blocks":[{"key":"bhae3","text":"This is a sample text from the database for Learning To Walk","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                guid: 'mkw2fklcwx',
            },
        ]);
    });
};
