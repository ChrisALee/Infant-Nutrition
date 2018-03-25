describe('auth tests', async () => {
    describe('GET /auth/login', () => {
        test('should return 200 OK', async () => {
            const injectOptions = {
                method: 'GET',
                url: '/api/v1/quizzes',
            };
            let server = global['server'];

            const response = await server.inject(injectOptions);

            expect(response.statusCode).toBe(200);
        });
    });
});
