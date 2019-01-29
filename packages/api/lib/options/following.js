'use strict';

const { createTimeline } = require('../helpers');

const internals = {};

exports.create = {
  handler: async (request, h) => {
    const client = request.server.app.client;
    const user = await client.users.query({ id: request.auth.credentials.id });
    const otherUser = await client.users.query({ id: request.params.userID });
    const following = user[0].following;
    const followers = otherUser[0].followers;
    await following.push(request.params.userID);
    await followers.push(user[0].id);
    await client.users.update({ id: request.auth.credentials.id, following });
    await client.users.update({ id: request.params.userID, followers });
    const timeline = await createTimeline(request.auth.credentials.id, client);
    return { following, followers, timeline };
  }
};

exports.delete = {
  handler: async (request, h) => {
    const client = request.server.app.client;
    const user = await client.users.query({ id: request.auth.credentials.id });
    const otherUser = await client.users.query({ id: request.params.userID });
    const following = user[0].following;
    const followers = otherUser[0].followers;
    const timeline = user[0].timeline.filter(
      post => post.username !== otherUser[0].userName
    );
    const followingIndex = await following.indexOf(request.params.userID);
    const followerIndex = await followers.indexOf(user[0].id);
    await following.splice(followingIndex, 1);
    await followers.splice(followerIndex, 1);
    await client.users.update({
      id: request.auth.credentials.id,
      following,
      timeline
    });
    await client.users.update({ id: request.params.userID, followers });
    return { following, followers, timeline };
  }
};
