'use strict';

const Joi = require('joi');
const Bcrypt = require('bcrypt');

const internals = {
    schema: {
        userName: Joi.string()
            .min(1)
            .required(),
        password: Joi.string()
            .min(1)
            .required(),
        firstName: Joi.string()
            .min(1)
            .required(),
        lastName: Joi.string()
            .min(1)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        posts: Joi.string()
            .min(1),
        comments: Joi.string().min(1),
        followers: Joi.string(),
        following: Joi.string(),
        imageURL: Joi.string(),
        location: Joi.string(),
        bio: Joi.string()
    }
};

exports.getAll = {
    handler: async (request, h) => {

        const client = request.server.app.client;
        const users = await client.users.query();
        return users;
    }
};

exports.get = {
    handler: async (request, h) => {

        const client = request.server.app.client;
        const name = request.params.username;
        const user = await client.users.query({ userName: name });
        if (user.length > 0) {
            return {
                userName: user[0].userName,
                firstName: user[0].firstName,
                lastName: user[0].lastName,
                email: user[0].email,
                imageURL: user[0].imageURL,
                location: user[0].location,
                posts: user[0].posts,
                bio: user[0].bio,
                followers: user[0].followers,
                following: user[0].following,
                timeline: user[0].timeline,
                mail: user[0].mail,
                id: user[0].id,
                login: true,
                loginError: null
            };
        }

        return { error: 'No results' };

    }
};

exports.create = {
    handler: async (request, h) => {

        const client = request.server.app.client;
        let userArray = await client.users.query({
            userName: request.payload.username
        });
        const emailArray = await client.users.query({
            email: request.payload.email
        });
        if (!userArray.length && !emailArray.length) {
            await client.users.insert({
                userName: request.payload.username,
                firstName: request.payload.firstName,
                lastName: request.payload.lastName,
                email: request.payload.email,
                imageURL: request.payload.imageURL,
                location: request.payload.location,
                bio: request.payload.bio,
                posts: [],
                followers: [],
                following: [],
                timeline: [],
                mail: {
                    sent: [],
                    received: []
                },
                password: Bcrypt.hashSync(request.payload.password, 10)
            });
            userArray = await client.users.query({
                userName: request.payload.username
            });
            await request.cookieAuth.set({ id: userArray[0].id });
            return {
                userName: request.payload.username,
                firstName: request.payload.firstName,
                lastName: request.payload.lastName,
                email: userArray[0].email,
                imageURL: request.payload.imageURL,
                location: request.payload.location,
                bio: request.payload.bio,
                id: userArray[0].id,
                posts: [],
                followers: [],
                following: [],
                timeline: [],
                mail: userArray[0].mail,
                login: true
            };
        }
        else if (userArray.length) {
            return { error: 'Username already exists' };
        }

        return { error: 'Email already exists' };

    },
    auth: false,
    validate: {
        payload: {
            username: internals.schema.userName,
            password: internals.schema.password,
            firstName: internals.schema.firstName,
            lastName: internals.schema.lastName,
            email: internals.schema.email,
            imageURL: internals.schema.imageURL,
            location: internals.schema.location,
            bio: internals.schema.bio
        },
        failAction: (request, h, err) => {

            throw err;
        }
    }
};

exports.update = {
    handler: async (request, h) => {

        const client = request.server.app.client;
        await client.users.update({
            id: request.auth.credentials.id,
            firstName: request.payload.firstName,
            lastName: request.payload.lastName,
            email: request.payload.email,
            location: request.payload.location,
            imageURL: request.payload.imageURL,
            bio: request.payload.bio
        });
        const updatedUser = await client.users.query({
            userName: request.params.username
        });
        return updatedUser;
    },
    validate: {
        payload: {
            firstName: internals.schema.firstName,
            lastName: internals.schema.lastName,
            email: internals.schema.email,
            imageURL: internals.schema.imageURL,
            location: internals.schema.location,
            bio: internals.schema.bio
        }
    }
};

exports.delete = {
    handler: async (request, h) => {

        const client = request.server.app.client;
        const userName = request.params.username;
        await client.users.remove(request.auth.credentials.id);
        return 'User: ' + userName + ' deleted.';
    }
};
