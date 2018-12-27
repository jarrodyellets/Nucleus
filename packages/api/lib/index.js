'use strict';

const User = require('./options/user');
const { dbase } = require('./client');
const Hapi = require('hapi');
const Joi = require('joi');
const Path = require('path');
const Bcrypt = require('bcrypt');
const _ = require('underscore');
let client;


//Deaclare internals

const internals = {
  schema: {
    userName: Joi.string().min(1).required(),
    password: Joi.string().min(1).required(),
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    posts: Joi.string().min(1).max(100),
    comments: Joi.string().min(1),
    followers: Joi.string(),
    following: Joi.string(),
    imageURL: Joi.string(),
    location: Joi.string()
  }
}


//Database server

const database = async () => {

  client = await dbase();

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

  await server.register(require('hapi-auth-basic'));
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


   //Home route
   server.route({
     method: 'GET',
     path: '/',
     handler: (request, h) => {
       return h.file('index.html');
     },
     options: {
       auth: false
     }
   })


   //Get CSS files
   server.route({
     method: 'GET',
     path: '/static/{path*}',
     handler: {
       directory: {
         path: './static'
       }
     },
     options: {
       auth: false
     }
   })


   //Get manifest
   server.route({
    method: 'GET',
    path: '/manifest.json',
    handler: (request, h) => {
      return h.file('manifest.json');
    },
    options: {
      auth: false
    }
  })


   //Login
   server.route({
     method: 'POST',
     path: '/login',
     handler: async (request, h) => {
      let { username, password } = request.payload;
      let user = await client.users.query({userName: username});
      
      if(user.length < 1){
        return {login: false, error: "Invalid Username", id: null};
      } else if (!await Bcrypt.compare(password, user[0].password)){
        return {login: false, error: "Invalid Password", id: null}
      }
      request.cookieAuth.set({ id: user[0].id })
      return {
        userName: user[0].userName,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
        imageURL: user[0].imageURL,
        location: user[0].location,
        posts: user[0].posts,
        followers: user[0].followers,
        following: user[0].following,
        id: request.auth.artifacts.id,
        login: true,
        loginError: null
      } 

    },
     options: {
       auth: false
     }
   });


   //Log user out
   server.route({
    method: 'GET',
    path: '/logout',
    handler: async (request, h) => {
      request.cookieAuth.clear();
      return {
        login: false
      }
    },
  })


  //Check if user is logged in
  server.route({
    method: 'GET',
    path: '/checklogin',
    handler: async (request, h) => {
        if(request.auth.isAuthenticated){
          const user = await client.users.query({id: request.auth.credentials.id})
          return {
            userName: user[0].userName,
            firstName: user[0].firstName,
            lastName: user[0].lastName,
            email: user[0].email,
            imageURL: user[0].imageURL,
            location: user[0].location,
            posts: user[0].posts,
            followers: user[0].followers,
            following: user[0].following,
            id: request.auth.artifacts.id,
            login: true,
            loginError: null
          }
        }
        return {
          login: false
      }
    },
    options: {
      auth: {
        mode: 'try'
      }
    }
  })


  //User routes
  server.route({method: 'GET', path: '/users', options: User.getAll})
  server.route({method: 'GET', path: '/users/{username}', options: User.get})
  server.route({method: 'POST', path: '/users', options: User.create})
  server.route({method: 'PUT', path: '/users/{username}', options: User.update})
  server.route({method: 'DELETE', path: '/users/{username}', options: User.delete})


  //Get blog post
  server.route({
    method: 'GET',
    path: '/users/{userId}/posts/{postId}',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.auth.credentials.id});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      return post;
    }
  })


  //Add blog post
  server.route({
    method: 'POST',
    path: '/users/posts',
    handler: async (request, h) => {
      const id = request.auth.artifacts.id;
      let user = await client.users.query({id: id});
      const posts = await user[0].posts;
      const date = Date.now();
      const newPost  = {
        date,
        comments: [],
        likes: [],
        post: request.payload.post,
        id: id + date
      }
      await posts.unshift(newPost);
      await client.users.update({id: id, posts});
      user = await client.users.query({id})
      return {
        posts: user[0].posts
      }
    },
    options: {
      validate: {
        payload: {
          post: internals.schema.posts
        }
      }
    }
  })


  //Update blog post
  server.route({
    method: 'PUT',
    path: '/users/{userId}/posts/{postId}',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.auth.credentials.id});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id)
      posts[postIndex].post = request.payload.post; 
      await client.users.update({id: request.auth.credentials.id, posts});
      return 'Post updated';
    },
    options: {
      validate: {
        payload: {
          post: internals.schema.posts
        }
      }
    }
  })


  //Delete blog post
  server.route({
    method: 'DELETE',
    path: '/users/{userId}/posts/{postId}',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.auth.credentials.id});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id);
      await posts.splice(postIndex, 1);
      await client.users.update({id: request.auth.credentials.id, posts});
      return 'Post deleted';
    }
  })


  //Get all comments
  server.route({
    method: 'GET',
    path: '/users/{userId}/posts/{postId}/comments',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      return post.comments;
    }
  })


  //Get comment
  server.route({
    method: 'GET',
    path:'/users/{userId}/posts/{postId}/comments/{commentId}',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const comment = await post.comments.find(comment => comment.id == request.params.commentId);
      return comment;
    }
  })


  //Add comment
  server.route({
    method: 'POST',
    path: '/users/{userId}/posts/{postId}/comments',
    handler: async (request, h) => {
      const author = request.auth.credentials.id;
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const date = Date.now();
      const post = await posts.findIndex(post => post.id == request.params.postId);
      await posts[post].comments.push({
        date,
        author: author,
        comment: request.payload.comment,
        id: author + date
      });
      await client.users.update({id: request.params.userId, posts});
      return 'Comment Added';
    },
    options: {
      validate: {
        payload: {
          comment: internals.schema.comments
        }
      }
    }
  })


  //Update comment
  server.route({
    method: 'PUT',
    path: '/users/{userId}/posts/{postId}/comments/{commentId}',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id);
      const comment = await post.comments.findIndex(comment => comment.id == request.params.commentId);
      posts[postIndex].comments[comment].comment = request.payload.comment;
      await client.users.update({id: request.auth.credentials.id, posts});
      return 'Comment updated';
    },
    options: {
      validate: {
        payload: {
          comment: internals.schema.comments
        }
      }
    }
  })


  //Delete comment
  server.route({
    method: 'DELETE',
    path: '/users/{userId}/posts/{postId}/comments/{commentId}',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id);
      const comment = await post.comments.findIndex(comment => comment.id == request.params.commentId);
      await posts[postIndex].comments.splice(comment, 1);
      await client.users.update({id: request.auth.credentials.id, posts});
      return 'Comment deleted';
    }
  })


  //Get all likes
  server.route({
    method: 'GET',
    path: '/users/{userId}/posts/{postId}/likes',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id);
      return posts[postIndex].likes;
    }
  })


  //Get all likes
  server.route({
    method: 'GET',
    path: '/user/{userId}/post/{postId}/like',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id);
      return posts[postIndex].likes;
    }
  })


  //Add like
  server.route({
    method: 'POST',
    path: '/users/{userId}/posts/{postId}/likes',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id);
      await posts[postIndex].likes.push(request.auth.credentials.id);
      await client.users.update({id: request.params.userId, posts})
      return 'Post liked!';
    }
  })


  //Delete like
  server.route({
    method: 'DELETE',
    path: '/users/{userId}/posts/{postId}/likes',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id);
      const likeIndex = await posts[postIndex].likes.find(like => like == request.auth.credentials.id);
      await posts[postIndex].likes.splice(likeIndex, 1);
      await client.users.update({id: request.params.userId, posts});
      return 'Like deleted';
    }
  })


  //Get all followers
  server.route({
    method: 'GET',
    path: '/users/{userId}/followers',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      return user[0].followers;
    }
  })


  //Add follower
  server.route({
    method: 'POST',
    path: '/users/{userId}/followers',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const followers = user[0].followers;
      await followers.push(request.auth.credentials.id);
      await client.users.update({id: request.params.userId, followers});
      return 'Friend added';
    }
  })


  //Delete friend
  server.route({
    method: 'DELETE',
    path: '/users/{userId}/followers',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const followers = user[0].followers;
      const followerIndex = await followers.find(friend => friend == request.auth.credentials.id);
      await followers.splice(followerIndex, 1);
      await client.users.update({id: request.params.userId, followers});
      return 'Friend deleted';
    }
  })


  try {
    await server.start()
    console.log('Server started on %s', server.info.uri);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

database();
