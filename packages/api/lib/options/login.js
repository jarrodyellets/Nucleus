'use strict';

const Bcrypt = require('bcrypt');

const internals = {};

exports.login = {
    handler: async (request, h) => {

        const client = request.server.app.client;
        const { username, password } = request.payload;
        const user = await client.users.query({ userName: username });
        if (user.length < 1) {
            return { login: false, error: 'Invalid Username', id: null };
        }
        else if (!(await Bcrypt.compare(password, user[0].password))) {
            return { login: false, error: 'Invalid Password', id: null };
        }

        request.cookieAuth.set({ id: user[0].id });
        const timeline = await request.server.app.createTimeline(user[0].id, client);
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
            timeline,
            mail: user[0].mail,
            id: request.auth.artifacts.id,
            login: true,
            loginError: null
        };
    },
    auth: false
};

exports.logout = {
    handler: (request, h) => {

        request.cookieAuth.clear();
        return {
            login: false
        };
    }
};

exports.check = {
    handler: async (request, h) => {

        const client = request.server.app.client;
        if (request.auth.isAuthenticated) {
            const user = await client.users.query({
                id: request.auth.credentials.id
            });
            const timeline = await request.server.app.createTimeline(request.auth.credentials.id, client);
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
                timeline,
                mail: user[0].mail,
                id: request.auth.credentials.id,
                login: true,
                loginError: null
            };
        }

        return {
            login: false
        };
    },
    auth: {
        mode: 'try'
    }
};
