exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('questions').then(function() {
        // Inserts seed entries
        return knex('questions').insert([
            {
                quiz_guid: 'DnZhL8bnC0',
                question: 'What is the recommended age for starting solid foods (the first food a baby has other than breast milk or formula)?',
                guid: 'zenAFirh9j',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: 'A baby\'s first food should be a good source of which nutrient?',
                guid: '1oCueapMWR',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: 'After introducing solid foods, it’s recommended that babies continue to be breastfed or given pumped breast milk until they are at least __ months old.',
                guid: 'uRpdprH5HI',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: 'How many tries can it take before a child likes a new food?',
                guid: '3iwNn6ETQo',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: ' After giving babies iron rich food, you must next introduce: ',
                guid: 'oR7HsRu2xZ',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: 'Which statement if FALSE?  Breast milk can...',
                guid: '8Iutx~rl4s',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: 'It is safe to start giving your baby solid foods when they can:',
                guid: 'kPd8h6Qk9k',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: 'Which of the following is a good mealtime routine?',
                guid: 'jiwFlAGHKs',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: 'Which of the following is NOT a sign your baby is hungry?',
                guid: 'gdZHYec4pd',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: 'When weaning your child from breast milk, you should do which of the following?',
                guid: 'k9ZzwxZczj',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: 'It is common for 6-month old babies to still wake up at night.',
                guid: 'xQ~DQShGjV',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: 'Babies point at food only when they are hungry.',
                guid: 'nWzeR9XUyN',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: 'Babies get spoiled if they get attention when they cry.',
                guid: 'AeJ3u5gZLW',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: 'Feeding a baby food or drinks too early can increase the risk of choking and developing allergies or diabetes.',
                guid: '3X7XoiXEv1',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: ' You should wait a few days after introducing one new type of food.',
                guid: 'wACXrOri9z',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: 'While breastfeeding, you should give your child cow’s milk to give them a variety of nutrients.',
                guid: 'J3Mioq_z2_',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: 'You should have a strict schedule for mealtimes to help your baby learn structure.',
                guid: 'brlrwuZ2tk',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: 'If your baby isn’t interested in eating at mealtime, you should take a break and try giving them a snack/meal later in the day.',
                guid: 'NNb04IUDEm',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: 'Tooth decay and low appetite can result from improper use of bottles and sippy cups.',
                guid: '~Wti7H~ltF',
            },
            {
                quiz_guid: 'DnZhL8bnC0',
                question: 'Drinking from a bottle while lying down can cause your baby to get an ear infection.',
                guid: 'pR2n53RWJe',
            },
            
        ]);
    });
};
