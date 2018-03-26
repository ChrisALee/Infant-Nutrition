exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('answers').then(function() {
        // Inserts seed entries
        return knex('answers').insert([
            {
                owner: 'zenAFirh9j',
                answer: '2',
                is_correct: true,
                guid: 'YjpXeiyAoH',
            },
            {
                owner: 'zenAFirh9j',
                answer: '5',
                is_correct: false,
                guid: 'oj9d8dGRMa',
            },
            {
                owner: 'vLQNUalEhu',
                answer: '10',
                is_correct: false,
                guid: 'YXqvQqFKzk',
            },
            {
                owner: 'vLQNUalEhu',
                answer: '22',
                is_correct: true,
                guid: 'aVDn8~wthy',
            },
            {
                owner: 'rCWRqFMiax',
                answer: '2',
                is_correct: true,
                guid: 'OIuJvq8e41',
            },
            {
                owner: 'rCWRqFMiax',
                answer: '26',
                is_correct: false,
                guid: 'psT7M1QU0A',
            },
            {
                owner: '8jYb6Dj4gT',
                answer: '13',
                is_correct: false,
                guid: '5D~MPWC4eX',
            },
            {
                owner: '8jYb6Dj4gT',
                answer: '25',
                is_correct: true,
                guid: 'kFAQEbIHjK',
            },
        ]);
    });
};
