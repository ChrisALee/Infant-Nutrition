import * as Joi from 'joi';

export const getAllContent = {
    query: {
        contentLocation: Joi.string().description(
            'the page location for the content',
        ),
    },
};

export const postContent = {
    payload: {
        content: Joi.object()
            .keys({
                contentType: Joi.string().required(),
                contentLocation: Joi.string().required(),
                text: Joi.string().required(),
            })
            .required()
            .description('the content body json payload'),
    },
};

export const putContent = {
    params: {
        contentGuid: Joi.string().required(),
    },
    payload: {
        // content: Joi.string(),
        content: Joi.object()
            .keys({
                text: Joi.object(),
            })
            .required()
            .description('the content body json payload'),
    },
};