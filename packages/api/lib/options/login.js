'use strict';

const { returnClient } = require('../client');
const { createTimeline } = require('../helpers');
const Bcrypt = require('bcrypt');

const internals = {};

exports.login = {
  handler: async (request, h) => {
    const client = returnClient();
    let { username, password } = request.payload;
    let user = await client.users.query({userName: username});
    const timeline = await createTimeline(user[0].id)
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
      timeline,
      id: request.auth.artifacts.id,
      login: true,
      loginError: null
    } 

  },
  auth: false
}

exports.logout = {
  handler: async (request, h) => {
    request.cookieAuth.clear();
    return {
      login: false
    }
  }
}

exports.check = {
  handler: async (request, h) => {
    const client = returnClient();
    if(request.auth.isAuthenticated){
      const user = await client.users.query({id: request.auth.credentials.id})
      const timeline = await createTimeline(request.auth.credentials.id)
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
        timeline,
        id: request.auth.artifacts.id,
        login: true,
        loginError: null
      }
    }
    return {
      login: false
  }
},
  auth: {
    mode: 'try'
  }
}