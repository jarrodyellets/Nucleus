'use strict';

const Hapi = require('hapi');
const Path = require('path');
const routes = require('./options')
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
                relativeTo: Path.join(__dirname, '..', '..', 'realmark-ui', 'build')
            },
            response: {
                emptyStatusCode: 204
            },
            cors: true
        }
    });

    server.app.client = client;
    server.app.vault = vault;

    server.ext('onPreResponse', internals.onPreResponse);

    await internals.auth(server);
    await internals.files(server);

    //Default route
    server.route({ method: 'GET', path: '/{any*}', options: routes.default.get });

    //Home routes
    server.route({ method: 'GET', path: '/', options: routes.home.home });
    server.route({ method: 'GET', path: '/static/{path*}', options: routes.home.css });
    server.route({ method: 'GET', path: '/manifest.json', options: routes.home.manifest });

    //Login routes
    server.route({ method: 'POST', path: '/login', options: routes.login.login });
    server.route({ method: 'GET', path: '/logout', options: routes.login.logout });
    server.route({ method: 'GET', path: '/checklogin', options: routes.login.check });

    //User routes
    server.route({ method: 'GET', path: '/users', options: routes.user.getAll });
    server.route({ method: 'GET', path: '/users/{username}', options: routes.user.get });
    server.route({ method: 'POST', path: '/users', options: routes.user.create });
    server.route({ method: 'PUT', path: '/users/{username}', options: routes.user.update });
    server.route({ method: 'DELETE', path: '/users/{username}', options: routes.user.delete });

    //Blog post routes
    server.route({ method: 'GET', path: '/users/{userId}/posts/{postId}', options: routes.blog.get });
    server.route({ method: 'POST', path: '/users/posts', options: routes.blog.create });
    server.route({ method: 'PUT', path: '/users/posts/{postId}', options: routes.blog.update });
    server.route({ method: 'DELETE', path: '/users/posts/{postId}', options: routes.blog.delete });

    //Comment routes
    server.route({ method: 'GET', path: '/users/{userId}/posts/{postId}/comments/{commentId}', options: routes.comments.get });
    server.route({ method: 'POST', path: '/users/{userId}/posts/{postId}/comments', options: routes.comments.create });
    server.route({ method: 'PUT', path: '/users/{userId}/posts/{postId}/comments/{commentId}', options: routes.comments.update });
    server.route({ method: 'DELETE', path: '/users/{userId}/posts/{postId}/comments/{commentId}', options: routes.comments.delete });

    //Likes routes
    server.route({ method: 'POST', path: '/users/{userId}/posts/{postId}/likes', options: routes.likes.create });
    server.route({ method: 'DELETE', path: '/users/{userId}/posts/{postId}/likes', options: routes.likes.delete });

    //Following routes
    server.route({ method: 'POST', path: '/users/following/{userID}', options: routes.following.create });
    server.route({ method: 'DELETE', path: '/users/following/{userID}', options: routes.following.delete });

    //Mail routes
    server.route({ method: 'GET', path: '/users/{userID}/mail/{messageID}', options: routes.mail.get });
    server.route({ method: 'POST', path: '/users/{userID}/mail/', options: routes.mail.create });
    server.route({ method: 'DELETE', path: '/users//{userID}/mail/{messageID}', options: routes.mail.delete });


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




