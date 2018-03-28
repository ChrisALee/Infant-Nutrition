import * as Bcrypt from 'bcrypt';
import * as Boom from 'boom';
import * as Hapi from 'hapi';
import * as JWT from 'jsonwebtoken';
import generate = require('nanoid/generate');
import url = require('nanoid/url');

import Knex from '../../utils/knex';
import Redis from '../../utils/redis';

export const postUser = async (
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
        email: userWithGuidAndSalt.email,
        guid,
    };

    // Set the session in Redis
    console.log('Made it to before Redis');
    try {
        console.log(Redis);
        await Redis.set(session.guid, JSON.stringify(session));
        console.log('Attempted Redis');
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
