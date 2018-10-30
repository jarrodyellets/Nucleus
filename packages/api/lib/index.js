'use strict';

const Db = require('@realmark/db');
const Hapi = require('hapi');
const Joi = require('joi');
const Bcrypt = require('bcrypt');
let client;


//Deaclare internals

const internals = {
  schema: {
    userName: Joi.string().min(1).max(20),
    password: Joi.string().min(1),
    firstName: Joi.string().min(1),
    lastName: Joi.string().min(1),
    email: Joi.string().email()
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


//Endpoints

const init = async () => {

  server.route({
    method: 'GET',
    path: '/user',
    handler: async (request, h) => {
      const userArray = await client.users.query({
        userName: request.query.userName
      });
      if (userArray.length) {
        return userArray;
      } else {
        return "User does not exist";
      }
    },
    options: {
      validate: {
        query: {
          userName: internals.schema.userName
        }
      }
    }
  })

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
              email: request.payload.email
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
      validate: {
        payload: {
          userName: internals.schema.userName,
          password: internals.schema.password,
          firstName: internals.schema.firstName,
          lastName: internals.schema.lastName,
          email: internals.schema.email
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