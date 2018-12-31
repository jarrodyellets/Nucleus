'use strict';

const Hapi = require('hapi');
const Path = require('path');
const _ = require('underscore');
const User = require('./options/user');
const Home = require('./options/home');
const Login = require('./options/login');
const Blog = require('./options/blog');
const Comments = require('./options/comment');
const Following = require('./options/following');
const Likes = require('./options/likes');
const { dbase } = require('./client');


//Deaclare internals
const interanals = {};


//Database server
const database = async () => {
  await dbase();
  await init();
}

//API server
const server = Hapi.server({
  port: 8000,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, '..', '..', 'realmark-ui', 'build')
    },
    response: {
      emptyStatusCode: 204
    },
    cors: true,
  }
});

const init = async () => {
  await server.register(require('hapi-auth-cookie'));
  await server.register([{
    plugin: require('inert')
  }])

  server.auth.strategy('session', 'cookie', { 
    password: 'RDXcdNWW6649jd9TKsQNsbSwfzNHrBBa',
    cookie: 'session',
    isSecure: false,
    redirectTo: '/'

  });

   server.auth.default('session');


   //Validation error handling
   server.ext('onPreResponse', function(request, h){
     const response = request.response;
     if(!response.isBoom){
       return h.continue;
     }
     if (request.route.method == 'post' && request.route.path == '/users'){
      const isUserNameEmpty = _.where(response.details, {message: '"username" is not allowed to be empty'}).length > 0;
      const isFirstNameEmpty = _.where(response.details, {message: '"firstName" is not allowed to be empty'}).length > 0;
      const isLastNameEmpty = _.where(response.details, {message: '"lastName" is not allowed to be empty'}).length > 0;
      const isNotEmail = _.where(response.details, {message: '"email" must be a valid email'}).length > 0;
      const isEmailEmpty = _.where(response.details, {message: '"email" is not allowed to be empty'}).length > 0;
      const isPasswordEmpty = _.where(response.details, {message: '"password" is not allowed to be empty'}).length > 0;
      return {error: {
        isUserNameEmpty,
        isFirstNameEmpty,
        isLastNameEmpty,
        isNotEmail,
        isEmailEmpty,
        isPasswordEmpty
      }}
     }
     return h.continue;
   })

  //Home routes
  server.route({method: 'GET', path: '/', options: Home.home});
  server.route({method: 'GET', path: '/static/{path*}', options: Home.css});
  server.route({method: 'GET', path: '/manifest.json', options: Home.manifest});

  //Login routes
  server.route({method: 'POST', path: '/login', options: Login.login});
  server.route({method: 'GET', path: '/logout', options: Login.logout});
  server.route({method: 'GET', path: '/checklogin', options: Login.check});

  //User routes
  server.route({method: 'GET', path: '/users', options: User.getAll});
  server.route({method: 'GET', path: '/users/{username}', options: User.get});
  server.route({method: 'POST', path: '/users', options: User.create});
  server.route({method: 'PUT', path: '/users/{username}', options: User.update});
  server.route({method: 'DELETE', path: '/users/{username}', options: User.delete});

  //Blog post routes
  server.route({method: 'GET', path: '/users/{userId}/posts/{postId}', options: Blog.get});
  server.route({method: 'POST', path: '/users/posts', options: Blog.create});
  server.route({method: 'UPDATE', path: '/users/posts/{postId}', options: Blog.update});
  server.route({method: 'DELETE', path: '/users/posts/{postId}', options: Blog.delete});

  //Comment routes
  server.route({method: 'GET', path: '/users/{userId}/posts/{postId}/comments', options: Comments.getAll});
  server.route({method: 'GET', path: '/users/{userId}/posts/{postId}/comments/{commentId}', options: Comments.get});
  server.route({method: 'POST', path: '/users/{userId}/posts/{postId}/comments', options: Comments.create});
  server.route({method: 'PUT', path: '/users/{userId}/posts/{postId}/comments/{commentId}', options: Comments.update});
  server.route({method: 'DELETE', path: '/users/{userId}/posts/{postId}/comments{commentId}', options: Comments.delete});

  //Likes routes
  server.route({method: 'POST', path: '/users/{userId}/posts/{postId}/likes', options: Likes.create});
  server.route({method: 'DELETE', path: '/users/{userId}/posts/{postId}/likes', options: Likes.delete});

  //Following routes
  server.route({method: 'POST', path: '/users/following/{userID}', options: Following.create});
  server.route({method: 'DELETE', path: '/users/following/{userID}', options: Following.delete});


  try {
    await server.start()
    console.log('Server started on %s', server.info.uri);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

database();
