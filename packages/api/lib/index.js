'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Routes = require('./options');
const { checkSignUpErrors } = require('./helpers');


//Deaclare internals
const internals = {};


//API server
exports.server = async (client, vault) => {

    const server = Hapi.server({
        app: {
            client,
            vault
        },
        port: 8000,
        routes: {
            files: {
                relativeTo: Path.join(__dirname, '..', '..', 'ui', 'build')
            },
            response: {
                emptyStatusCode: 204
            },
            cors: true
        }
    });

    server.app.client = client;
    server.app.vault = vault;
    server.app.createTimeline = internals.helpers.createTimeline;
    server.app.findComment = internals.helpers.findComment;
    server.app.checkSignUpErrors = internals.helpers.checkSignUpErrors;

    server.ext('onPreResponse', internals.onPreResponse);

    await internals.auth(server);
    await internals.files(server);

    //Default route
    server.route({ method: 'GET', path: '/{any*}', options: Routes.default.get });

    //Home routes
    server.route({ method: 'GET', path: '/', options: Routes.home.home });
    server.route({ method: 'GET', path: '/static/{path*}', options: Routes.home.css });
    server.route({ method: 'GET', path: '/manifest.json', options: Routes.home.manifest });

    //Login routes
    server.route({ method: 'POST', path: '/login', options: Routes.login.login });
    server.route({ method: 'GET', path: '/logout', options: Routes.login.logout });
    server.route({ method: 'GET', path: '/checklogin', options: Routes.login.check });

    //User routes
    server.route({ method: 'GET', path: '/users', options: Routes.user.getAll });
    server.route({ method: 'GET', path: '/users/{username}', options: Routes.user.get });
    server.route({ method: 'POST', path: '/users', options: Routes.user.create });
    server.route({ method: 'PUT', path: '/users/{username}', options: Routes.user.update });
    server.route({ method: 'DELETE', path: '/users/{username}', options: Routes.user.delete });

    //Blog post routes
    server.route({ method: 'GET', path: '/users/{userId}/posts/{postId}', options: Routes.blog.get });
    server.route({ method: 'POST', path: '/users/posts', options: Routes.blog.create });
    server.route({ method: 'PUT', path: '/users/posts/{postId}', options: Routes.blog.update });
    server.route({ method: 'DELETE', path: '/users/posts/{postId}', options: Routes.blog.delete });

    //Comment routes
    server.route({ method: 'GET', path: '/users/{userId}/posts/{postId}/comments/{commentId}', options: Routes.comments.get });
    server.route({ method: 'POST', path: '/users/{userId}/posts/{postId}/comments', options: Routes.comments.create });
    server.route({ method: 'PUT', path: '/users/{userId}/posts/{postId}/comments/{commentId}', options: Routes.comments.update });
    server.route({ method: 'DELETE', path: '/users/{userId}/posts/{postId}/comments/{commentId}', options: Routes.comments.delete });

    //Likes routes
    server.route({ method: 'POST', path: '/users/{userId}/posts/{postId}/likes', options: Routes.likes.create });
    server.route({ method: 'DELETE', path: '/users/{userId}/posts/{postId}/likes', options: Routes.likes.delete });

    //Following routes
    server.route({ method: 'GET', path: '/users/following/{userID}', options: Routes.following.getFollowing });
    server.route({ method: 'GET', path: '/users/followers/{userID}', options: Routes.following.getFollowers });
    server.route({ method: 'POST', path: '/users/following/{userID}', options: Routes.following.create });
    server.route({ method: 'DELETE', path: '/users/following/{userID}', options: Routes.following.delete });

    //Mail routes
    server.route({ method: 'GET', path: '/users/{userID}/mail/{messageID}', options: Routes.mail.get });
    server.route({ method: 'POST', path: '/users/{userID}/mail/{messageID}', options: Routes.mail.read });
    server.route({ method: 'POST', path: '/users/{userID}/mail', options: Routes.mail.create });
    server.route({ method: 'DELETE', path: '/users/mail/{messageID}', options: Routes.mail.delete });


    return server;
};

internals.auth = async (server) => {

    await server.register(require('hapi-auth-cookie'));

    server.auth.strategy('session', 'cookie', {
        password: server.app.vault.vendors.auth.secret,
        cookie: 'session',
        isSecure: false,
        redirectTo: '/'
    });

    server.auth.default('session');
};


internals.files = async (server) => {

    await server.register(require('inert'));
};


internals.onPreResponse = async (request, h) => {

    const response = request.response;
    if (!response.isBoom){
        return h.continue;
    }
    else if (request.route.path === '/users'){
        const errors = await checkSignUpErrors(response.details);
        return errors;
    }

    return h.continue;
};

internals.helpers = {
    createTimeline: async (id, client) => {

        let user = await client.users.query({ id });
        const timeline = [];
        for (const u of user[0].following) {
            const following = await client.users.query({ id: u });
            for (const post of following[0].posts) {
                await timeline.push(post);
            }
        }
    
        for (const post of user[0].posts) {
            await timeline.push(post);
        }
    
        await client.users.update({ id, timeline });
        user = await client.users.query({ id });
        return user[0].timeline;
    },
    findComment: async (posts, path) => {

        let comment = posts[0].comments;
        let post;
        let currentPost;
        for (let i = 1; i < path.length; ++i) {
            const commentID = path[i];
            const postIndex = comment.findIndex((y) => y.postID === commentID);
            post = comment[postIndex];
            comment = comment[postIndex].comments;
            if (i === path.length - 2) {
                currentPost = post;
            }

            if (path.length === 2) {
                currentPost = posts[0];
            }
        }

        return { post, currentPost };
    },
    checkSignUpErrors: async (details) => {

        const isUserNameEmpty = (details[0].message === '"username" is not allowed to be empty');
        const isFirstNameEmpty = (details[0].message === '"firstName" is not allowed to be empty');
        const isLastNameEmpty = (details[0].message === '"lastName" is not allowed to be empty');
        const isNotEmail = (details[0].message === '"email" must be a valid email');
        const isEmailEmpty = (details[0].message === '"email" is not allowed to be empty');
        const isPasswordEmpty = (details[0].message === '"password" is not allowed to be empty');
        return { error: {
            isUserNameEmpty,
            isFirstNameEmpty,
            isLastNameEmpty,
            isNotEmail,
            isEmailEmpty,
            isPasswordEmpty
        },
    details: details };
    }
}



