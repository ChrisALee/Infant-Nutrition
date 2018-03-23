import Knex from './knex';
import * as Bcrypt from 'bcrypt';
import * as GUID from 'node-uuid';
import * as Hapi from 'hapi';
import * as Joi from 'joi';
import * as JWT from 'jsonwebtoken';
import * as redis from 'redis';

require('dotenv').config();

// TODO: Replace 'any' with proper type
const routes = [
    {
        path: '/auth/login',
        method: 'POST',
        config: {
            auth: false,
            description: 'Login route',
            notes: 'Authenticates user and returns JWT in Auth Header',
            tags: ['api'],
            validate: {
                payload: {
                    user: Joi.object()
                        .keys({
                            username: Joi.string().required(),
                            password: Joi.string().required(),
                        })
                        .required()
                        .description('the user body json payload'),
                },
            },
        },
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            try {
                const { user }: any = request.payload;

                const results = await Knex('users')
                    .where({
                        username: user.username,
                    })
                    .first();

                if (!results || results.length === 0) {
                    return {
                        error: true,
                        errMessage: 'no user found',
                    };
                }

                // TODO: Salt passwords in account creation
                // This is just here for debugging purposes at the moment
                const saltedPass = await Bcrypt.hash(results.password, 10);

                const isValid = await Bcrypt.compare(user.password, saltedPass);

                if (!isValid) {
                    return 'wrong password';
                }

                const session = {
                    valid: true,
                    ...results,
                };
                // create the session in Redis
                const redisClient = (request as any).redis.client;
                try {
                    await redisClient.set(
                        session.guid,
                        JSON.stringify(session),
                    );
                } catch (err) {
                    // throw Boom.internal('Internal Redis error')
                    throw err;
                }

                const token = JWT.sign(session, process.env.JWT_KEY);
                console.log(token);

                return h
                    .response({ text: 'Check Auth Header for your Token' })
                    .type('application/json')
                    .header('Authorization', token);
            } catch (err) {
                console.log(err);
                return err;
            }
        },
    },
    {
        path: '/auth/logout',
        method: 'POST',
        config: {
            auth: 'jwt',
            description: 'Logout route',
            notes: 'De-authenticates user and invalidates JWT',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    authorization: Joi.string().required(),
                }).unknown(),
            },
        },
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            try {
                const redisClient = (request as any).redis.client;

                const redisResult = await redisClient.get(
                    (request as any).auth.credentials.guid,
                );

                const session = JSON.parse(redisResult);
                console.log(' - - - - - - SESSION - - - - - - - -');
                console.log(session);
                // update the session to no longer valid:
                session.valid = false;
                session.ended = new Date().getTime();
                // create the session in Redis
                await redisClient.set(session.guid, JSON.stringify(session));

                return h.response({ text: 'You have been logged out' });
            } catch (err) {
                console.log(err);
                return err;
            }
        },
    },
    {
        path: '/users/{userGuid}/babies',
        method: 'GET',
        config: {
            auth: 'jwt',
            description: 'Get babies',
            notes:
                'Returns baby items for the user with the userGuid passed in the path',
            tags: ['api'],
            validate: {
                params: {
                    userGuid: Joi.string()
                        .required()
                        .description('the guid for the user'),
                },
                headers: Joi.object({
                    authorization: Joi.string().required(),
                }).unknown(),
            },
        },
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            try {
                console.log(request.headers.authorization);
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
        config: {
            auth: 'jwt',
            description: 'Post baby',
            notes:
                'Adds a baby to the user specified with the userGuid passed in the path',
            tags: ['api'],
            validate: {
                params: {
                    userGuid: Joi.string()
                        .required()
                        .description('the guid for the user'),
                },
                payload: {
                    baby: Joi.object()
                        .keys({
                            name: Joi.string().required(),
                            age: Joi.number()
                                .integer()
                                .min(0)
                                .max(1000)
                                .required(),
                        })
                        .required()
                        .description('the baby body json payload'),
                },
                headers: Joi.object({
                    authorization: Joi.string().required(),
                }).unknown(),
            },
        },
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
        config: {
            auth: false,
            description: 'Get quizzes',
            notes: 'Returns all quiz items',
            tags: ['api'],
        },
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
        config: {
            auth: false,
            description: 'Get quiz questions',
            notes:
                'Returns quiz question items for the quiz with the quizGuid passed in the path',
            tags: ['api'],
            validate: {
                params: {
                    quizGuid: Joi.string()
                        .required()
                        .description('the guid for the quiz'),
                },
            },
        },
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
        config: {
            auth: false,
            description: 'Get quiz answers',
            notes:
                'Returns quiz answer items for the quiz with the quizGuid passed in the path',
            tags: ['api'],
            validate: {
                params: {
                    quizGuid: Joi.string()
                        .required()
                        .description('the guid for the quiz'),
                },
            },
        },
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
        config: {
            auth: 'jwt',
            description: 'Get quiz results',
            notes:
                'Returns quiz result items for the user with the userGuid passed in the path',
            tags: ['api'],
            validate: {
                params: {
                    userGuid: Joi.string()
                        .required()
                        .description('the guid for the user'),
                },
                headers: Joi.object({
                    authorization: Joi.string().required(),
                }).unknown(),
            },
        },
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
        config: {
            auth: 'jwt',
            description: 'Post quiz results',
            notes:
                'Adds quiz result for the user with the userGuid and quiz with the quizGuid passed in the path',
            tags: ['api'],
            validate: {
                params: {
                    quizGuid: Joi.string()
                        .required()
                        .description('the guid for the quiz'),
                    userGuid: Joi.string()
                        .required()
                        .description('the guid for the user'),
                },
                payload: {
                    quiz_result: Joi.object()
                        .keys({
                            score: Joi.number()
                                .integer()
                                .min(0)
                                .max(1000)
                                .required(),
                        })
                        .required()
                        .description('the quiz result body json payload'),
                },
                headers: Joi.object({
                    authorization: Joi.string().required(),
                }).unknown(),
            },
        },
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
        config: {
            auth: 'jwt',
            description: 'Get user settings',
            notes:
                'Returns user setting items for the user with the userGuid passed in the path',
            tags: ['api'],
            validate: {
                params: {
                    userGuid: Joi.string()
                        .required()
                        .description('the guid for the user'),
                },
                headers: Joi.object({
                    authorization: Joi.string().required(),
                }).unknown(),
            },
        },
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
        config: {
            auth: 'jwt',
            description: 'Post user settings',
            notes: 'Adds user settings for the user with the userGuid',
            tags: ['api'],
            validate: {
                params: {
                    userGuid: Joi.string()
                        .required()
                        .description('the guid for the user'),
                },
                payload: {
                    user_settings: Joi.object()
                        .keys({
                            should_email: Joi.boolean().required(),
                        })
                        .required()
                        .description('the user setting body json payload'),
                },
                headers: Joi.object({
                    authorization: Joi.string().required(),
                }).unknown(),
            },
        },
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
            auth: 'jwt',
            description: 'Put user settings',
            notes: 'Updates user settings for the user with the userGuid',
            tags: ['api'],
            validate: {
                params: {
                    userSettingsGuid: Joi.string()
                        .required()
                        .description('the guid for the user settings'),
                    userGuid: Joi.string()
                        .required()
                        .description('the guid for the user'),
                },
                payload: {
                    user_settings: Joi.object()
                        .keys({
                            should_email: Joi.boolean().required(),
                        })
                        .required()
                        .description('the user setting body json payload'),
                },
                headers: Joi.object({
                    authorization: Joi.string().required(),
                }).unknown(),
            },
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

                const insertOperation = await Knex('user_settings')
                    .where({
                        guid: userSettingsGuid,
                    })
                    .update({
                        should_email: user_settings.should_email,
                    });

                return {
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
