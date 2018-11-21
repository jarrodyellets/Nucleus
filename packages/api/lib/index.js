'use strict';

const Db = require('@realmark/db');
const Hapi = require('hapi');
const Joi = require('joi');
const Bcrypt = require('bcrypt');
let client;


//Deaclare internals

const internals = {
  schema: {
    userName: Joi.string().min(1).max(20).required(),
    password: Joi.string().min(1).required(),
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    posts: Joi.string().min(1).max(100),
    comments: Joi.string().min(1)
  }
}


//Database server

const database = async () => {

  const server = await Db.server();

  await server.start();

  client = new Db.Client({
    location: server.info.uri,
    database: 'blog'
  });

  await client.create();

  const create = ({
    id: {
      type: 'uuid'
    }
  });

  await client.table('users', {
    create
  });

  await init();
}


//API server

const server = Hapi.server({
  port: 8000,
  routes: {
    response: {
      emptyStatusCode: 204
    },
  }
});


//Auth Strategy

const validate = async (request, username, password, h) => {

  const userArray = await client.users.query({
    userName: username
  });

  const user = userArray[0];

  if (!user) {
    return { credentials: null, isValid: false };
  }

  const isValid = await Bcrypt.compare(password, user.password);
  const credentials = { id: user.id, name: user.firstName };

  return { isValid, credentials };
}


const init = async () => {

  await server.register(require('hapi-auth-basic'));

  server.auth.strategy('simple', 'basic', { validate });
  server.auth.default('simple');


  //Get all users
  server.route({
    method: 'GET',
    path: '/user',
    handler: async (request, h) => {
      const users = await client.users.query(); 
      return users;
    },
  })

  
  //Get specific user
  server.route({
    method: 'GET',
    path: '/user/{userId}',
    handler: async (request, h) => {
      const id = request.auth.credentials.id;
      const user = await client.users.query({id});
      return user
    }
  })

  //Create user
  server.route({
    method: 'POST',
    path: '/user',
    handler: async (request, h) => {
      const userArray = await client.users.query({
        userName: request.payload.userName
      });
      const emailArray = await client.users.query({
        email: request.payload.email
      })
      if (!userArray.length && !emailArray.length) {
        Bcrypt.hash(request.payload.password, 10, function(err, hash) {
          if (err) {
            console.log(err);
          } else {
            client.users.insert({
              userName: request.payload.userName,
              password: hash,
              firstName: request.payload.firstName,
              lastName: request.payload.lastName,
              email: request.payload.email,
              posts: []
            });
          }
        })

        return "User Added";
      } else if(userArray.length){
        return "Username already exists";
      } else {
        return "Email address already exists";
      }
    },
    options: {
      auth: false,
      validate: {
        payload: {
          userName: internals.schema.userName,
          password: internals.schema.password,
          firstName: internals.schema.firstName,
          lastName: internals.schema.lastName,
          email: internals.schema.email,
          post: internals.schema.posts
        }
      }
    }
  })


  //Update user
  server.route({
    method: 'PUT',
    path: '/user/{id}',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.auth.credentials.id});
      const emailArray = await client.users.query({
        email: request.payload.email
      });
      if(!emailArray.length){
        await client.users.update({
          id: request.auth.credentials.id,
          firstName: request.payload.firstName,
          lastName: request.payload.lastName,
          email: request.payload.email
        })
        const updatedUser = await client.users.query({id: request.auth.credentials.id});
        return updatedUser
      } else {
        return "Email already exists"
      }
    },
    options: {
      validate: {
        payload: {
          firstName: internals.schema.firstName,
          lastName: internals.schema.lastName,
          email: internals.schema.email,
        }
      }
    }
  })


  //Delete user
  server.route({
    method: 'DELETE',
    path: '/user/{id}',
    handler: async (request, h) => {
      const userName = request.auth.credentials.name;
      await client.users.remove(request.params.id);
      return "User: " + userName + " deleted." ;
    }
  })


  //Get blog post
  server.route({
    method: 'GET',
    path: '/user/{userId}/post/{postId}',
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
    path: '/user/{userId}/post',
    handler: async (request, h) => {
      const id = request.auth.credentials.id;
      const user = await client.users.query({id: id});
      const posts = await user[0].posts;
      const date = Date.now();
      const newPost  = {
        date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        comments: [],
        post: request.payload.post,
        id: id + date
      }
      await posts.push(newPost);
      await client.users.update({id: id, posts: posts});
      return "New Post Added";
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
    path: '/user/{userId}/post/{postId}',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.auth.credentials.id});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id)
      posts[postIndex].post = request.payload.post; 
      await client.users.update({id: request.auth.credentials.id, posts: posts});
      const updatedPosts = await client.users.query({id: request.auth.credentials.id});
      return updatedPosts
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
    path: '/user/{userId}/post/{postId}',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.auth.credentials.id});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id);
      await posts.splice(postIndex, 1);
      await client.users.update({id: request.auth.credentials.id, posts: posts});
      const updatedPosts = await client.users.query({id: request.auth.credentials.id});
      return updatedPosts
    }
  })


  //Get all comments
  server.route({
    method: 'GET',
    path: '/user/{userId}/post/{postId}/comment',
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
    path:'/user/{userId}/post/{postId}/comment/{commentId}',
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
    path: '/user/{userId}/post/{postId}/comment',
    handler: async (request, h) => {
      const author = request.auth.credentials.id;
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const date = Date.now();
      const post = await posts.findIndex(post => post.id == request.params.postId);
      await posts[post].comments.push({
        date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        author: author,
        comment: request.payload.comment,
        id: author + date
      });
      await client.users.update({id: request.params.userId, posts: posts});
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
    path: '/user/{userId}/post/{postId}/comment/{commentId}',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id);
      const comment = await post.comments.findIndex(comment => comment.id == request.params.commentId);
      posts[postIndex].comments[comment].comment = request.payload.comment;
      await client.users.update({id: request.auth.credentials.id, posts: posts});
      const updatedPosts = await client.users.query({id: request.auth.credentials.id});
      return 'Comment updated';
    }
  })


  //Delete comment
  server.route({
    method: 'DELETE',
    path: '/user/{userId}/post/{postId}/comment/{commentId}',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id);
      const comment = await post.comments.findIndex(comment => comment.id == request.params.commentId);
      await posts[postIndex].comments.splice(comment, 1);
      await client.users.update({id: request.auth.credentials.id, posts: posts});
      const updatedPosts = await client.users.query({id: request.auth.credentials.id});
      return 'Comment deleted'
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