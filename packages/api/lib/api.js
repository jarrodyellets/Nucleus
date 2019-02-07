'use strict';

const Hapi = require('hapi');
const Path = require('path');
const User = require('./options/user');
const Home = require('./options/home');
const Login = require('./options/login');
const Blog = require('./options/blog');
const Comments = require('./options/comment');
const Following = require('./options/following');
const Likes = require('./options/likes');
const Default = require('./options/default');
const { dbase } = require('./client');
const { checkSignUpErrors } = require('./helpers');


//Deaclare internals
const internals = {};

//API server

exports.server = async (seed) => {

    const server = Hapi.server({
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

    server.app.client = await dbase(seed);

    // server.ext('onPreResponse', internals.onPreResponse);

    await internals.auth(server);
    await internals.files(server);

    //Default route
    server.route({ method: 'GET', path: '/{any*}', options: Default.get });

    //Home routes
    server.route({ method: 'GET', path: '/', options: Home.home });
    server.route({ method: 'GET', path: '/static/{path*}', options: Home.css });
    server.route({ method: 'GET', path: '/manifest.json', options: Home.manifest });

    //Login routes
    server.route({ method: 'POST', path: '/login', options: Login.login });
    server.route({ method: 'GET', path: '/logout', options: Login.logout });
    server.route({ method: 'GET', path: '/checklogin', options: Login.check });

    //User routes
    server.route({ method: 'GET', path: '/users', options: User.getAll });
    server.route({ method: 'GET', path: '/users/{username}', options: User.get });
    server.route({ method: 'POST', path: '/users', options: User.create });
    server.route({ method: 'PUT', path: '/users/{username}', options: User.update });
    server.route({ method: 'DELETE', path: '/users/{username}', options: User.delete });

    //Blog post routes
    server.route({ method: 'GET', path: '/users/{userId}/posts/{postId}', options: Blog.get });
    server.route({ method: 'POST', path: '/users/posts', options: Blog.create });
    server.route({ method: 'PUT', path: '/users/posts/{postId}', options: Blog.update });
    server.route({ method: 'DELETE', path: '/users/posts/{postId}', options: Blog.delete });

    //Comment routes
    server.route({ method: 'GET', path: '/users/{userId}/posts/{postId}/comments/{commentId}', options: Comments.get });
    server.route({ method: 'POST', path: '/users/{userId}/posts/{postId}/comments', options: Comments.create });
    server.route({ method: 'PUT', path: '/users/{userId}/posts/{postId}/comments/{commentId}', options: Comments.update });
    server.route({ method: 'DELETE', path: '/users/{userId}/posts/{postId}/comments/{commentId}', options: Comments.delete });

    //Likes routes
    server.route({ method: 'POST', path: '/users/{userId}/posts/{postId}/likes', options: Likes.create });
    server.route({ method: 'DELETE', path: '/users/{userId}/posts/{postId}/likes', options: Likes.delete });

    //Following routes
    server.route({ method: 'POST', path: '/users/following/{userID}', options: Following.create });
    server.route({ method: 'DELETE', path: '/users/following/{userID}', options: Following.delete });

    await server.inject({
        method: 'POST',
        url: '/user',
        payload: {
            username: 'roger',
            password: 'hello',
            firstName: 'Roger',
            lastName: 'Rabbit',
            email: 'roger@acme.com',
            imageURL: 'https://vignette.wikia.nocookie.net/disney/images/b/b6/Rogerpoint.png/revision/latest?cb=20131219044547',
            location: 'Toon Town',
            bio: 'Actor'
        }
    });

    return server;
};

internals.auth = async (server) => {

    await server.register(require('hapi-auth-cookie'));

    server.auth.strategy('session', 'cookie', {
        password: 'RDXcdNWW6649jd9TKsQNsbSwfzNHrBBa',
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

    if (request.route.method === 'post' && request.route.path === '/users'){
        const errors = await checkSignUpErrors(response.details);
        return errors;
    }

    return h.continue;
};



