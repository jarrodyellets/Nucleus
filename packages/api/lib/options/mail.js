'use strict';

const Joi = require('joi');

const internals = {
    schema: {
        mail: Joi.string().min(1)
    }
};

exports.get = {
    handler: async () => {

        const client = request.server.app.client;
        const user = await client.users.query({ id: request.params.userId });
        const mail = user[0].mail.recieved;
        const message = await mail.find((p) => p.messageID === request.params.messageId);
        return message;
    }
}

exports.create = {
    handler: async () => {

        const client = request.server.app.client;
        const id = request.auth.credentials.id;
        let author = await client.users.query({id});
        let recipient = await client.users.query({id: request.params.userID})
        const date = Date.now();
        const newMail = {
            messageID: id + date,
            id,
            message: request.payload.message,
            date,
            from: author[0].firstName + ' ' + author[0].lastName,
            subject: request.payload.subject
        }
        await recipient[0].mail.recieved.unshift(newMail);
        await author[0].mail.sent.unshift(newMail);
        await client.users.update({
            id: request.params.userID,
            mail: recipient[0].mail
        });
        await client.users.update({
            id,
            mail: author[0].mail
        })
        author = await client.users.query({id})
        recipient = await client.users.query({id: request.params.userID})

        return {
            recipient: {
                mail: recipient[0].mail
            },
            author: {
                mail: author[0].mail
            }
        }
    }
}

exports.delete = {
    handler: async () => {

        const client = request.server.app.client;
        const user = await client.users.query({ id: request.auth.credentials.id });
        const mail = user[0].mail;
        const message = await mail.recieved.find((p) => p.messageID === request.params.messageID);
        const messageIndex = await mail.recieved.findIndex((x) => x.messageID === message.messageID);
        await mail.recieved.splice(messageIndex, 1);
        await client.users.update({ id: request.auth.credentials.id, mail });
        return 'Message deleted';
    }
}