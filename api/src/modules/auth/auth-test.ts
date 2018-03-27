describe('Auth', () => {
    const server = global['server'];
    const Redis = global['Redis'];

    describe('Login', () => {
        describe('POST /auth/login', () => {
            test('should login in as user when correct payload', async () => {
                const injectOptions = {
                    method: 'POST',
                    url: '/auth/login',
                    payload: {
                        user: {
                            username: 'clee',
                            password: 'password1',
                        },
                    },
                };

                const response = await server.inject(injectOptions);

                expect(response.statusCode).toBe(200);
            });

            test('should not login as user when incorrect payload', async () => {
                const injectOptions = {
                    method: 'POST',
                    url: '/auth/login',
                    payload: {
                        user: {
                            username: 'cle231je',
                            password: 'passwo312312rd1',
                        },
                    },
                };

                const response = await server.inject(injectOptions);

                expect(response.statusCode).toBe(401);
            });

            test('should not login as user when malformed payload', async () => {
                const injectOptions = {
                    method: 'POST',
                    url: '/auth/login',
                    payload: {
                        user: {
                            username: 'clee',
                        },
                    },
                };

                const response = await server.inject(injectOptions);

                expect(response.statusCode).toBe(400);
            });
        });
    });

    describe('Logout', () => {
        describe('POST /auth/logout', () => {
            beforeEach(async () => {
                await Redis.flushdb();
            });

            test('should logout when correct session credentials', async () => {
                const injectOptions = {
                    method: 'POST',
                    url: '/auth/logout',
                    // Bypass validation by sending credentials
                    credentials: {
                        sessionGuid: 0,
                    },
                };

                await Redis.set(0, JSON.stringify({ guid: 0, valid: true }));

                const response = await server.inject(injectOptions);

                expect(response.statusCode).toBe(200);
            });

            test('should not logout when incorrect session credentials', async () => {
                const injectOptions = {
                    method: 'POST',
                    url: '/auth/logout',
                    // Bypass validation by sending credentials
                    credentials: {
                        sessionGuid: 5,
                    },
                };

                await Redis.set(1, JSON.stringify({ guid: 1, valid: true }));

                const response = await server.inject(injectOptions);

                expect(response.statusCode).toBe(401);
            });

            test('should not logout when malformed session credentials', async () => {
                const injectOptions = {
                    method: 'POST',
                    url: '/auth/logout',
                    // Bypass validation by sending credentials
                    credentials: {
                        malformedItem: 5,
                    },
                };

                await Redis.set(2, JSON.stringify({ guid: 2, valid: true }));

                const response = await server.inject(injectOptions);

                expect(response.statusCode).toBe(400);
            });
        });
    });

    describe('Register', () => {
        describe('POST /auth/register', () => {
            test('should register new user when correct payload', async () => {
                const injectOptions = {
                    method: 'POST',
                    url: '/auth/register',
                    payload: {
                        user: {
                            username: '1234',
                            password: '1234',
                            name: '1234',
                            email: '1234',
                            // TODO: Uncomment when JOI validators are hardened
                            // email: '1234@email.com'
                        },
                    },
                };

                const response = await server.inject(injectOptions);

                expect(response.statusCode).toBe(200);
            });

            // TODO: Uncomment when JOI validators are hardened
            // test('should not register new user when incorrect payload', async () => {
            //     const injectOptions = {
            //         method: 'POST',
            //         url: '/auth/register',
            //         payload: {
            //             user: {
            //                 username: '12345',
            //                 password: '12345',
            //                 name: '12345',
            //                 email: '12345',
            //             },
            //         },
            //     };

            //     const response = await server.inject(injectOptions);

            //     expect(response.statusCode).toBe(200);
            // });

            test('should not register new user when malformed payload', async () => {
                const injectOptions = {
                    method: 'POST',
                    url: '/auth/register',
                    payload: {
                        user: {
                            username: '1234567',
                            malformedItem: '1234567',
                        },
                    },
                };

                const response = await server.inject(injectOptions);

                expect(response.statusCode).toBe(400);
            });
        });
    });
});
