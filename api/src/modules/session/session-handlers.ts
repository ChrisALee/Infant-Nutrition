import * as Bcrypt from 'bcrypt';
import * as Boom from 'boom';
import * as Hapi from 'hapi';
import * as JWT from 'jsonwebtoken';
import generate = require('nanoid/generate');
import url = require('nanoid/url');

import Knex from '../../utils/knex';
import Redis from '../../utils/redis';

export const postSession = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    const { user }: any = request.payload;
    let results;

    try {
        // Use supplied credentials to fetch user from database
        if (user.username && user.username.length > 0) {
            results = await Knex('users')
                .where({
                    username: user.username,
                })
                .first();
        } else {
            results = await Knex('users')
                .where({
                    email: user.email,
                })
                .first();
        }

        // Invalid user was supplied and was unable to fetch from database
        if (!results || results.length === 0) {
            throw new Error('Invalid username or email');
        }

        const isValid = await Bcrypt.compare(user.password, results.password);

        if (!isValid) {
            throw new Error('Invalid password');
        }
    } catch (err) {
        request.log('auth', err);
        throw Boom.unauthorized('Invalid credentials');
    }

    // Redis session data
    const guid = generate(url, 10);
    const session = {
        valid: true,
        userGuid: results.guid,
        username: results.username,
        email: results.email,
        scope: results.scope,
        guid,
    };

    // Set the session in Redis
    try {
        await Redis.set(session.guid, JSON.stringify(session));
    } catch (err) {
        request.log('auth', err);
        throw Boom.internal('Internal Redis error');
    }

    // TODO: set a good expiresIn for access token after refresh token
    // is implemented
    const token = JWT.sign(
        { guid: session.guid, scope: results.scope },
        process.env.JWT_KEY,
        {
            expiresIn: '30h',
        },
    );

    return h
        .response({
            text: 'Check Auth Header for your Token',
            scope: results.scope,
        })
        .type('application/json')
        .state('token', token);
};

export const deleteSession = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    let redisResult;
    try {
        // Get Redis session
        redisResult = await Redis.get(
            (request as any).auth.credentials.sessionGuid,
        );
    } catch (err) {
        request.log('auth', err);
        throw Boom.badRequest(err);
    }

    if (!redisResult || redisResult.length === 0) {
        throw Boom.unauthorized('Invalid credentials');
    }

    const session = JSON.parse(redisResult);

    // update the session to no longer valid
    session.valid = false;
    session.ended = new Date().getTime();

    try {
        // create the session in Redis
        await Redis.set(session.guid, JSON.stringify(session));
    } catch (err) {
        request.log('auth', err);
        throw Boom.internal('Internal Redis error');
    }

    return h.response({ text: 'You have been logged out' }).unstate('token');
};
