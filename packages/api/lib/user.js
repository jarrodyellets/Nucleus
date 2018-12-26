'use strict'

const hi = require('./index')

const internals = {};

exports.get = {
  handler: async (request, h) => {
      // const users = await client.users.query(); 
      // return users;
      console.log(client);
      return true;
  },
}