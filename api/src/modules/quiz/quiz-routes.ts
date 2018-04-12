import * as quizHandlers from './quiz-handlers';
import * as quizValidators from './quiz-validators';

exports.register = (server, options) => {
    server.route({
        path: '/quizzes',
        method: 'GET',
        config: {
            auth: false,
            description: 'Get quizzes',
            notes: 'Returns all quiz items',
            tags: ['api', 'quizzes'],
        },
        handler: quizHandlers.getQuizzes,
    });

    server.route({
        path: '/full-quizzes',
        method: 'GET',
        config: {
            auth: false,
            description: 'Get quizzes with questions and answers',
            notes: 'Returns all quiz items and items related to quizzes',
            tags: ['api', 'quizzes'],
        },
        handler: quizHandlers.getFullQuizzes,
    });

    server.route({
        path: '/quizzes/{quizGuid}/questions',
        method: 'GET',
        config: {
            auth: false,
            description: 'Get quiz questions',
            notes:
                'Returns quiz question items for the quiz with the quizGuid passed in the path',
            tags: ['api', 'quizzes'],
            validate: quizValidators.getQuestions,
        },
        handler: quizHandlers.getQuestions,
    });

    server.route({
        path: '/quizzes/{quizGuid}/questions/{questionGuid}/answers',
        method: 'GET',
        config: {
            auth: false,
            description: 'Get quiz answers',
            notes:
                'Returns quiz answer items for the quiz with the quizGuid and questionGuid passed in the path',
            tags: ['api', 'quizzes'],
            validate: quizValidators.getAnswers,
        },
        handler: quizHandlers.getAnswers,
    });

    server.route({
        path: '/quizzes/quiz-results/current',
        method: 'GET',
        config: {
            auth: 'jwt',
            description: 'Get quiz results from the current user',
            notes:
                'Returns quiz result items for the user with the userGuid passed in the path',
            tags: ['api', 'quizzes'],
        },
        handler: quizHandlers.getResultsCurrent,
    });

    server.route({
        path: '/quizzes/quiz-results/current',
        method: 'POST',
        config: {
            auth: 'jwt',
            description: 'Add quiz results to the current user',
            notes:
                'Adds quiz result for the user with the userGuid and quiz with the quizGuid passed in the path',
            tags: ['api', 'quizzes'],
            validate: quizValidators.postResultsCurrent,
        },
        handler: quizHandlers.postResultsCurrent,
    });
};

exports.name = 'quiz';
