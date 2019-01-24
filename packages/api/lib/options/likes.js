'use strict';

const { returnClient } = require('../client');
const { createTimeline, findComment } = require('../helpers');

const internals = {};

exports.create = {
  handler: async (request, h) => {
    const client = returnClient();
    let user = await client.users.query({id: request.params.userId});
    let path = request.payload.path
    const posts = user[0].posts;
    let comment
    let postIndex = await posts.findIndex(x => x.postID == request.params.postId);
    const parentPost = await posts.findIndex(p => p.postID == path[0]);
    if (await postIndex === -1){
      comment = await findComment(posts, path);
      await comment.likes.push(request.auth.credentials.id);
    } else {
      comment = user[0].posts[parentPost];
      await posts[postIndex].likes.push(request.auth.credentials.id);
    }
    await client.users.update({id: request.params.userId, posts})
    user = await client.users.query({id: request.params.userId})
    const signedUser = await client.users.query({id: request.auth.credentials.id})
    const timeline = await createTimeline(request.auth.credentials.id);
    return {
      posts: user[0].posts, post: comment, signedPosts: signedUser[0].posts, timeline
    };
  }
}

exports.delete = {
  handler: async (request, h) => {
    const client = returnClient();
    let user = await client.users.query({id: request.params.userId});
    let path = request.payload.path
    const posts = user[0].posts;
    let comment
    let postIndex = await posts.findIndex(x => x.postID == request.params.postId);
    const parentPost = await posts.findIndex(p => p.postID == path[0]);
    if (await postIndex === -1){
      comment = await findComment(posts, path);
    } else {
      comment = user[0].posts[parentPost];
    }
    const likeIndex = await comment.likes.find(like => like == request.auth.credentials.id);
    await comment.likes.splice(likeIndex, 1);
    await client.users.update({id: request.params.userId, posts})
    user = await client.users.query({id: request.params.userId})
    const signedUser = await client.users.query({id: request.auth.credentials.id})
    const timeline = await createTimeline(request.auth.credentials.id);
    return {
      posts: user[0].posts, post: comment, signedPosts: signedUser[0].posts, timeline
    };
  }
}

