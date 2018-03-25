require('dotenv').config();

exports.register = (server, options) => {
    const validate = async (decoded, request, h) => {
        if (!decoded.guid) {
            return { credentials: null, isValid: false };
        }

        console.log(decoded);

        // TODO: Change to refresh token
        // check if jwt is expired
        // if (decoded.exp < Date.now().valueOf() / 1000) {
        // ping refresh token

        // }

        const redisClient = request.redis.client;
        try {
            var redisResult = await redisClient.get(decoded.guid);
        } catch (err) {
            // throw Boom.internal('Internal Redis error);
            throw err;
        }

        if (redisResult) {
            var session = JSON.parse(redisResult);
        } else {
            return { credentials: null, isValid: false };
        }

        if (session.valid === true) {
            const credentials = {
                authGuid: session.userGuid,
                sessionGuid: session.guid,
                username: session.username,
                email: session.email,
                name: session.name,
            };
            return { credentials, isValid: true };
        } else {
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
