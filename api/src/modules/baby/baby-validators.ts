import * as Joi from 'joi';

export const postBaby = {
    payload: {
        baby: Joi.object()
            .keys({
                name: Joi.string().required(),
                dateOfBirth: Joi.date().required(),
            })
            .required()
            .description('the baby body json payload'),
    },
};
