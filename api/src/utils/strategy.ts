import Redis from './redis';

exports.register = (server, options) => {
    const validate = async (decoded, request, h) => {
        // TODO: Change to refresh token
        // check if jwt is expired
        // if (decoded.exp < Date.now().valueOf() / 1000) {
        // ping refresh token

        // }

        try {
            if (!decoded.guid) {
                throw new Error('Token missing');
            }

            const redisResult = await Redis.get(decoded.guid);
            const session = JSON.parse(redisResult);

            if (session.valid === true) {
                const credentials = {
                    userGuid: session.userGuid,
                    sessionGuid: session.guid,
                    username: session.username,
                    email: session.email,
                };
                return { credentials, isValid: true };
            } else {
                throw new Error('Invalid session');
            }
        } catch (err) {
            return { credentials: null, isValid: false };
        }
    };

    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_KEY, // Never Share your secret key
        validate,
        verifyOptions: { algorithms: ['HS256'], ignoreExpiration: true }, // pick a strong algorithm
    });

    server.auth.default('jwt');
};

exports.name = 'strategy';
