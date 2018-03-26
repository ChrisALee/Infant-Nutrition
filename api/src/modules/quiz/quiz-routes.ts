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
            tags: ['api'],
        },
        handler: quizHandlers.getQuizzes,
    });

    server.route({
        path: '/quizzes/{quizGuid}/questions',
        method: 'GET',
        config: {
            auth: false,
            description: 'Get quiz questions',
            notes:
                'Returns quiz question items for the quiz with the quizGuid passed in the path',
            tags: ['api'],
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
                'Returns quiz answer items for the quiz with the quizGuid passed in the path',
            tags: ['api'],
            validate: quizValidators.getAnswers,
        },
        handler: quizHandlers.getAnswers,
    });

    server.route({
        path: '/users/{userGuid}/quiz-results',
        method: 'GET',
        config: {
            auth: 'jwt',
            description: 'Get quiz results',
            notes:
                'Returns quiz result items for the user with the userGuid passed in the path',
            tags: ['api'],
            validate: quizValidators.getResults,
        },
        handler: quizHandlers.getResults,
    });

    server.route({
        path: '/users/{userGuid}/quiz-results/quiz/{quizGuid}',
        method: 'POST',
        config: {
            auth: 'jwt',
            description: 'Post quiz results',
            notes:
                'Adds quiz result for the user with the userGuid and quiz with the quizGuid passed in the path',
            tags: ['api'],
            validate: quizValidators.postResults,
        },
        handler: quizHandlers.postResults,
    });
};

exports.name = 'quiz';
