exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('questions').then(function() {
        // Inserts seed entries
        return knex('questions').insert([
            {
                owner: 'DnZhL8bnC0',
                question: 'What is 1+1?',
                guid: 'zenAFirh9j',
            },
            {
                owner: 'DnZhL8bnC0',
                question: 'What is 21+1?',
                guid: 'vLQNUalEhu',
            },
            {
                owner: 'WI9g6uzzIz',
                question: 'What is 2/1?',
                guid: 'rCWRqFMiax',
            },
            {
                owner: 'WI9g6uzzIz',
                question: 'What is 5*5?',
                guid: '8jYb6Dj4gT',
            },
        ]);
    });
};
