'use strict';

const Joi = require('joi');

const internals = {
    schema: {
        mail: Joi.string().min(1)
    }
};

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