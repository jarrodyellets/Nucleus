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
    posts: Joi.string()
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

  //Get user info
  server.route({
    method: 'GET',
    path: '/user',
    handler: async (request, h) => {
      const user = client.users.query({id: request.auth.credentials.id}); 
      return user
    },
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
        return "Email address already exists"
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


  //Add blog post
  server.route({
    method: 'POST',
    path: '/post',
    handler: async (request, h) => {
      const id = request.auth.credentials.id;
      const user = await client.users.query({id: id});
      const posts = await user[0].posts;
      const newPost  = {
        date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        comments: [],
        post: request.payload.post
      }
      await posts.push(newPost);
      await client.users.update({id: id, posts: posts})
      return "New post added";
    },
    options: {
      validate: {
        payload: {
          post: internals.schema.posts
        }
      }
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