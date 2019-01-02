'use strict'

const { returnClient } = require('../client');
const Joi = require('joi');
const Bcrypt = require('bcrypt');

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

exports.getAll = {
  handler: async (request, h) => {
    const client = returnClient();
    const users = await client.users.query(); 
    return users;
  },
}

exports.get = {
  handler: async (request, h) => {
    const client = returnClient();
    const name = request.params.username;
    const user = await client.users.query({userName: name});
    if(user != []){
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
        timeline: user[0].timeline,
        id: request.auth.artifacts.id,
        login: true,
        loginError: null
      };
    } else {
      return {error: 'No results'}
    }
  }
}

exports.create = {
  handler: async (request, h) => {
    const client = returnClient();
    let userArray = await client.users.query({
      userName: request.payload.username
    });
    const emailArray = await client.users.query({
      email: request.payload.email
    })
    if (!userArray.length && !emailArray.length) {
      await client.users.insert({
        userName: request.payload.username,
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        imageURL: request.payload.imageURL,
        location: request.payload.location,
        posts: [],
        followers: [],
        following: [],
        timeline: []
      })
      await Bcrypt.hash(request.payload.password, 10, async (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          const newUser = await client.users.query({userName: request.payload.username})
          await client.users.update({
            id: newUser[0].id,
            password: hash
          }, {insert: true}); 
        }
      })
      userArray = await client.users.query({userName: request.payload.username})
      await request.cookieAuth.set({ id: userArray[0].id })
      return {
        userName: request.payload.username,
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        imageURL: request.payload.imageURL,
        location: request.payload.location,
        id: userArray[0].id,
        posts: [],
        followers: [],
        following: [],
        timeline: [],
        login: true,
      };
    } else if(userArray.length){
      return {error: "Username already exists"};
    } else {
      return {error: "Email already exists"};
    }
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
      location: internals.schema.location
    },
    failAction: (request, h, err) => {
      throw err;
    }
  }
}

exports.update = {
  handler: async (request, h) => {
    const client = returnClient();
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
      return updatedUser;
    } else {
      return "Email already exists";
    }
  },
  validate: {
    payload: {
      firstName: internals.schema.firstName,
      lastName: internals.schema.lastName,
      email: internals.schema.email,
    }
  }
}

exports.delete = {
  handler: async (request, h) => {
    const client = returnClient();
    const userName = request.auth.credentials.name;
    await client.users.remove(request.params.id);
    return "User: " + userName + " deleted.";
  }
}