import Knex from '../../utils/knex';
import * as Bcrypt from 'bcrypt';
import * as Hapi from 'hapi';
import * as JWT from 'jsonwebtoken';
import * as redis from 'redis';
import nanoid = require('nanoid');
import url = require('nanoid/url');
import generate = require('nanoid/generate');

exports.login = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
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

        const isValid = await Bcrypt.compare(user.password, results.password);

        if (!isValid) {
            return 'wrong password';
        }

        const guid = generate(url, 10);

        const session = {
            valid: true,
            userGuid: results.guid,
            username: results.username,
            email: results.email,
            guid,
        };
        // create the session in Redis
        const redisClient = (request as any).redis.client;
        try {
            await redisClient.set(session.guid, JSON.stringify(session));
        } catch (err) {
            // throw Boom.internal('Internal Redis error')
            throw err;
        }

        // TODO: set a good expiresIn for access token after refresh token
        // is implemented
        const token = JWT.sign({ guid: session.guid }, process.env.JWT_KEY, {
            expiresIn: '30h',
        });

        return h
            .response({ text: 'Check Auth Header for your Token' })
            .type('application/json')
            .header('Authorization', token)
            .state('token', token);
    } catch (err) {
        console.log(err);
        return err;
    }
};

exports.logout = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    try {
        const redisClient = (request as any).redis.client;

        const redisResult = await redisClient.get(
            (request as any).auth.credentials.sessionGuid,
        );

        const session = JSON.parse(redisResult);
        // update the session to no longer valid:
        session.valid = false;
        session.ended = new Date().getTime();
        // create the session in Redis
        await redisClient.set(session.guid, JSON.stringify(session));

        return h
            .response({ text: 'You have been logged out' })
            .unstate('token');
    } catch (err) {
        console.log(err);
        return err;
    }
};

exports.registerUser = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { user }: any = request.payload;
        const guid = generate(url, 10);

        const saltedPass = await Bcrypt.hash(user.password, 10);

        const userWithGuidAndSalt = {
            ...user,
            password: saltedPass,
            guid,
        };

        await Knex('users').insert(userWithGuidAndSalt);

        const session = {
            valid: true,
            guid: userWithGuidAndSalt.guid,
            username: userWithGuidAndSalt.username,
            name: userWithGuidAndSalt.username,
            email: userWithGuidAndSalt.email,
        };
        // create the session in Redis
        const redisClient = (request as any).redis.client;
        try {
            await redisClient.set(session.guid, JSON.stringify(session));
        } catch (err) {
            // throw Boom.internal('Internal Redis error')
            throw err;
        }

        const token = JWT.sign(session, process.env.JWT_KEY);

        return h
            .response({ text: 'Check Auth Header for your Token' })
            .type('application/json')
            .header('Authorization', token)
            .state('token', token);
    } catch (err) {
        console.log(err);
        return err;
    }
};
