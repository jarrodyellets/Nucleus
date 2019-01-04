'use strict';

const { returnClient } = require('../client');

const internals = {};

exports.create = {
  handler: async (request, h) => {
    const client = returnClient();
    let user = await client.users.query({id: request.params.userId});
    let signedUser = await client.users.query({id: request.auth.credentials.id});
    const posts = user[0].posts;
    const timeline = signedUser[0].timeline;
    const postIndex = await posts.findIndex(x => x.postID == request.params.postId);
    const timeIndex = await timeline.findIndex(x => x.postID == request.params.postId);
    await posts[postIndex].likes.push(request.auth.credentials.id);
    if (signedUser[0].following.includes(request.params.userId) || signedUser[0].id === request.params.userId){
      await timeline[timeIndex].likes.push(request.auth.credentials.id);
    }
    await client.users.update({id: request.params.userId, posts, timeline})
    user = await client.users.query({id: request.params.userId})
    return {
      posts: user[0].posts,
      timeline: signedUser[0].timeline
    };
  }
}

exports.delete = {
  handler: async (request, h) => {
    const client = returnClient();
    const user = await client.users.query({id: request.params.userId});
    const posts = user[0].posts;
    const post = await posts.find(post => post.id == request.params.postId);
    const postIndex = await posts.findIndex(x => x.id == post.id);
    const likeIndex = await posts[postIndex].likes.find(like => like == request.auth.credentials.id);
    await posts[postIndex].likes.splice(likeIndex, 1);
    await client.users.update({id: request.params.userId, posts});
    return 'Like deleted';
  }
}