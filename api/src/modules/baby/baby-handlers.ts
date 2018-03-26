import * as Hapi from 'hapi';
import generate = require('nanoid/generate');
import url = require('nanoid/url');

import Knex from '../../utils/knex';

require('dotenv').config();

export const getBabies = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { userGuid }: any = request.params;
        const { authGuid }: any = request.auth.credentials;

        if (authGuid !== userGuid) {
            return {
                error: true,
                errMessage: 'Invalid user',
            };
        }

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
};

export const postBaby = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
) => {
    try {
        const { userGuid }: any = request.params;
        const { baby }: any = request.payload;
        const { authGuid }: any = request.auth.credentials;

        if (authGuid !== userGuid) {
            return {
                error: true,
                errMessage: 'Invalid user',
            };
        }

        const guid = generate(url, 10);

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
};
