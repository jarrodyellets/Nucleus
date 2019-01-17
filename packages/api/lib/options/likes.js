'use strict';

const { returnClient } = require('../client');
const { createTimeline } = require('../helpers');

const internals = {};

exports.create = {
  handler: async (request, h) => {
    const client = returnClient();
    let user = await client.users.query({id: request.params.userId});
    const posts = user[0].posts;
    const postIndex = await posts.findIndex(x => x.postID == request.params.postId);
    if (await postIndex === -1){
      console.log(request.payload)
    } else {
      await posts[postIndex].likes.push(request.auth.credentials.id);
    }
    await client.users.update({id: request.params.userId, posts})
    user = await client.users.query({id: request.params.userId})
    const timeline = await createTimeline(request.auth.credentials.id);
    return {
      posts: user[0].posts, post: user[0].posts[postIndex], timeline
    };
  }
}

exports.delete = {
  handler: async (request, h) => {
    const client = returnClient();
    let user = await client.users.query({id: request.params.userId});
    const posts = user[0].posts;
    const postIndex = await posts.findIndex(x => x.postID == request.params.postId);
    const likeIndex = await posts[postIndex].likes.find(like => like == request.auth.credentials.id);
    await posts[postIndex].likes.splice(likeIndex, 1);
    await client.users.update({id: request.params.userId, posts});
    user = await client.users.query({id: request.params.userID});
    const timeline = await createTimeline(request.auth.credentials.id);
    return {
      posts: user[0].posts, post: user[0].posts[postIndex], timeline
    };
  }
}