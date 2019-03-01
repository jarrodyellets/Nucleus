'use strict';

const Joi = require('joi');

const internals = {
    schema: {
        message: Joi.string().min(1),
        subject: Joi.string().min(1)
    }
};

exports.get = {
    handler: async (request, h) => {

        const client = request.server.app.client;
        const user = await client.users.query({ id: request.params.userID });
        const mail = await user[0].mail.received;
        const message = await mail.find((p) => p.messageID === request.params.messageID);
        return message;
    }
};

exports.create = {
    handler: async (request, h) => {

        const client = request.server.app.client;
        const id = request.auth.credentials.id;
        let author = await client.users.query({ id });
        let recipient = await client.users.query({ id: request.params.userID });
        const date = Date.now();
        const newMail = {
            messageID: id + date,
            id,
            message: request.payload.message,
            date,
            from: author[0].firstName + ' ' + author[0].lastName,
            to: recipient[0].firstName + ' ' + recipient[0].lastName,
            subject: request.payload.subject,
            read: false
        };
        await recipient[0].mail.received.unshift(newMail);
        await author[0].mail.sent.unshift(newMail);
        await client.users.update({
            id: request.params.userID,
            mail: recipient[0].mail
        });
        await client.users.update({
            id,
            mail: author[0].mail
        });
        author = await client.users.query({ id });
        recipient = await client.users.query({ id: request.params.userID });

        return {
            recipient: {
                mail: recipient[0].mail
            },
            author: {
                mail: author[0].mail
            }
        };
    },
    validate: {
        failAction: (request, h, err) => {

            throw err;
        },
        payload: {
            message: internals.schema.message,
            subject: internals.schema.subject
        }
    }
};

exports.delete = {
    handler: async (request, h) => {

        const client = request.server.app.client;
        const box = request.payload.box;
        let user = await client.users.query({ id: request.auth.credentials.id });
        const mail = user[0].mail;
        const message = await mail[box].find((p) => p.messageID === request.params.messageID);
        const messageIndex = await mail[box].findIndex((x) => x.messageID === message.messageID);
        await mail[box].splice(messageIndex, 1);
        await client.users.update({ id: request.auth.credentials.id, mail });
        user = await client.users.query({ id: request.auth.credentials.id });
        return {
            mail: user[0].mail
        };
    }
};
