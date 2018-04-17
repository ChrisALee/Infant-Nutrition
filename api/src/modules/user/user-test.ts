describe('user tests', async () => {
    describe('GET /api/users', () => {
        test('should return 200 OK', async () => {
            const injectOptions = {
                method: 'GET',
                url: '/api/users',
            };
            const server = global['server'];

            const response = await server.inject(injectOptions);

            expect(response.statusCode).toBe(200);
        });
    });
});
