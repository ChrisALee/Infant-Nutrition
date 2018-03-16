import Knex from './knex';
import * as Hapi from 'hapi';

const routes = [
    {
        path: '/users/{userGuid}/babies',
        method: 'GET',
        config: { auth: false },
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            try {
                const { userGuid }: any = request.params;
                const results = await Knex('babies')
                    .where({
                        owner: userGuid,
                    })
                    .select('name', 'age');

                if (!results || results.length === 0) {
                    return {
                        error: true,
                        errMessage: 'no babies found',
                    };
                }

                return results;
            } catch (err) {
                console.log(err);
                return err;
            }
        },
    },
    {
        path: '/users/{user}/babies',
        method: 'POST',
        config: { auth: false },
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            try {
                const results = await Knex('birds')
                    .where({
                        isPublic: true,
                    })
                    .select('name', 'species', 'picture_url');
                if (!results || results.length === 0) {
                    return {
                        error: true,
                        errMessage: 'no public bird found',
                    };
                }
                return {
                    dataCount: results.length,
                    data: results,
                };
            } catch (err) {
                console.log(err);
                return err;
            }
        },
    },
    {
        path: '/quizzes',
        method: 'GET',
        config: { auth: false },
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            try {
                const results = await Knex('quizzes').select(
                    'name',
                    'num_questions',
                );

                if (!results || results.length === 0) {
                    return {
                        error: true,
                        errMessage: 'no quizzes found',
                    };
                }

                return results;
            } catch (err) {
                console.log(err);
                return err;
            }
        },
    },
    {
        path: '/quizzes/{quizGuid}/questions',
        method: 'GET',
        config: { auth: false },
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            try {
                const { quizGuid }: any = request.params;
                const results = await Knex('questions')
                    .where({
                        owner: quizGuid,
                    })
                    .select('question');

                if (!results || results.length === 0) {
                    return {
                        error: true,
                        errMessage: 'no questions found',
                    };
                }

                return results;
            } catch (err) {
                console.log(err);
                return err;
            }
        },
    },
    {
        path: '/quizzes/{quizGuid}/questions/{questionGuid}/answers',
        method: 'GET',
        config: { auth: false },
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            try {
                const { questionGuid }: any = request.params;
                const results = await Knex('answers')
                    .where({
                        owner: questionGuid,
                    })
                    .select('answer', 'is_correct');

                if (!results || results.length === 0) {
                    return {
                        error: true,
                        errMessage: 'no answers found',
                    };
                }

                return results;
            } catch (err) {
                console.log(err);
                return err;
            }
        },
    },
    {
        path: '/users/{userGuid}/quiz_results',
        method: 'GET',
        config: { auth: false },
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            try {
                const { userGuid }: any = request.params;
                const results = await Knex('quiz_results')
                    .join('quizzes', 'quiz_results.quiz_owner', 'quizzes.guid')
                    .where({
                        user_owner: userGuid,
                    })
                    .select('quiz_results.score', 'quizzes.name');

                if (!results || results.length === 0) {
                    return {
                        error: true,
                        errMessage: 'no quiz results found',
                    };
                }

                return results;
            } catch (err) {
                console.log(err);
                return err;
            }
        },
    },
    {
        path: '/users/{userGuid}/user_settings',
        method: 'GET',
        config: { auth: false },
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            try {
                const { userGuid }: any = request.params;
                const results = await Knex('user_settings')
                    .where({
                        owner: userGuid,
                    })
                    .select('should_email');

                if (!results || results.length === 0) {
                    return {
                        error: true,
                        errMessage: 'no user settings found',
                    };
                }

                return results;
            } catch (err) {
                console.log(err);
                return err;
            }
        },
    },
];

export default routes;
