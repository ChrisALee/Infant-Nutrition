import * as Bcrypt from 'bcrypt';
import * as Boom from 'boom';
import * as Hapi from 'hapi';
import * as JWT from 'jsonwebtoken';
import generate = require('nanoid/generate');
import url = require('nanoid/url');

import Knex from '../../utils/knex';
import Redis from '../../utils/redis';

export const login = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    const { user }: any = request.payload;
    let results;

    try {
        // Use supplied credentials to fetch user from database
        results = await Knex('users')
            .where({
                username: user.username,
            })
            .first();

        // Invalid user was supplied and was unable to fetch from database
        if (!results || results.length === 0) {
            throw 'Invalid username';
        }

        const isValid = await Bcrypt.compare(user.password, results.password);

        if (!isValid) {
            throw 'Invalid password';
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
    const token = JWT.sign({ guid: session.guid }, process.env.JWT_KEY, {
        expiresIn: '30h',
    });

    return h
        .response({ text: 'Check Auth Header for your Token' })
        .type('application/json')
        .header('Authorization', token)
        .state('token', token);
};

export const logout = async (
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

export const register = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    const { user }: any = request.payload;
    const userGuid = generate(url, 10);
    let saltedPass;

    // Salt the password
    try {
        saltedPass = await Bcrypt.hash(user.password, 10);
    } catch (err) {
        request.log('auth', err);
        throw Boom.internal('Failed to salt password');
    }

    // Create a new user object with all final data for database
    const userWithGuidAndSalt = {
        ...user,
        password: saltedPass,
        guid: userGuid,
    };

    try {
        await Knex('users').insert(userWithGuidAndSalt);
    } catch (err) {
        request.log('auth', err);
        throw Boom.internal('Internal database error');
    }

    const guid = generate(url, 10);

    const session = {
        valid: true,
        userGuid: userWithGuidAndSalt.guid,
        username: userWithGuidAndSalt.username,
        name: userWithGuidAndSalt.username,
        email: userWithGuidAndSalt.email,
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
    const token = JWT.sign({ guid: session.guid }, process.env.JWT_KEY, {
        expiresIn: '30h',
    });

    return h
        .response({ text: 'Check Auth Header for your Token' })
        .type('application/json')
        .header('Authorization', token)
        .state('token', token);
};
