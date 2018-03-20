import Knex from './knex';
import * as GUID from 'node-uuid';
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
        path: '/users/{userGuid}/babies',
        method: 'POST',
        config: { auth: false },
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            try {
                const { userGuid }: any = request.params;
                const { baby }: any = request.payload;
                const guid = GUID.v4();

                const insertOperation = await Knex('babies').insert({
                    owner: userGuid,
                    name: baby.name,
                    age: baby.age,
                    guid,
                });

                return {
                    data: guid,
                    message: 'successfully created baby',
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
        path: '/users/{userGuid}/quiz_results/quiz/{quizGuid}',
        method: 'POST',
        config: { auth: false },
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            try {
                const { quizGuid, userGuid }: any = request.params;
                const { quiz_result }: any = request.payload;
                const guid = GUID.v4();

                const insertOperation = await Knex('quiz_results').insert({
                    user_owner: userGuid,
                    quiz_owner: quizGuid,
                    score: quiz_result.score,
                    guid,
                });

                return {
                    data: guid,
                    message: 'successfully created quiz results',
                };
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
    {
        path: '/users/{userGuid}/user_settings',
        method: 'POST',
        config: { auth: false },
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            try {
                const { userGuid }: any = request.params;
                const { user_settings }: any = request.payload;
                const guid = GUID.v4();

                const insertOperation = await Knex('quiz_results').insert({
                    owner: userGuid,
                    should_email: user_settings.should_email,
                    guid,
                });

                return {
                    data: guid,
                    message: 'successfully created user settings',
                };
            } catch (err) {
                console.log(err);
                return err;
            }
        },
    },
    {
        path: '/users/{userGuid}/user_settings/{userSettingsGuid}',
        method: 'PUT',
        config: {
            auth: false,
            pre: [
                {
                    method: async (
                        request: Hapi.Request,
                        h: Hapi.ResponseToolkit,
                    ) => {
                        const { userSettingsGuid } = request.params;

                        const results = await Knex('user_settings')
                            .where({
                                guid: userSettingsGuid,
                            })
                            .select('owner');

                        if (!results) {
                            return {
                                error: true,
                                errMessage: `the user_settings with id ${userSettingsGuid} was not found`,
                            };
                        }
                        return 'success';
                    },
                },
            ],
        },
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            try {
                const { userSettingsGuid }: any = request.params;
                const { user_settings }: any = request.payload;
                const guid = GUID.v4();

                const insertOperation = await Knex('user_settings')
                    .where({
                        guid: userSettingsGuid,
                    })
                    .update({
                        should_email: user_settings.should_email,
                        guid,
                    });

                return {
                    data: guid,
                    message: 'successfully updated user settings',
                };
            } catch (err) {
                console.log(err);
                return err;
            }
        },
    },
];

export default routes;
