'use strict';

const { returnClient } = require('../client');

const internals = {};

exports.create = {
  handler: async (request, h) => {
    const client = returnClient();
    const user = await client.users.query({id: request.auth.credentials.id});
    const otherUser = await client.users.query({username: request.params.username})
    const following = user[0].following;
    const followers = otherUser[0].followers
    await following.push(request.params.username);
    await followers.push(user[0].username);
    await client.users.update({id: request.auth.credentials.id, following});
    await client.users.update({username: request.params.username, followers});
    return 'Friend added';
  }
}

exports.delete = {
  handler: async (request, h) => {
    const client = returnClient();
    const user = await client.users.query({id: request.auth.credentials.id});
    const otherUser = await client.users.query({username: request.params.username})
    const following = user[0].following;
    const followers = otherUser[0].followers
    const followingIndex = await following.find(friend => friend == request.params.username);
    const followerIndex = await followers.find(friends => friend == user[0].username)
    await following.splice(followingIndex, 1);
    await following.splice(followerIndex, 1)
    await client.users.update({id: request.auth.credentials.id, following});
    await client.users.update({username: request.params.useraname, followers});
    return 'Friend deleted';
  }
}