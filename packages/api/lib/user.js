'use strict'

const { returnClient } = require('./client');

const internals = {};

exports.get = {
  handler: async (request, h) => {
    const client = returnClient();
    console.log(client);
      const users = await client.users.query(); 
      return users;
  },
}