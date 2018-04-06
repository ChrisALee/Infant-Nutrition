import * as Joi from 'joi';

export const postContent = {
    payload: {
        content: Joi.object()
            .keys({
                contentType: Joi.string().required(),
                text: Joi.string().required(),
            })
            .required()
            .description('the content body json payload'),
    },
};
