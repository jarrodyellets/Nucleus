'use strict';

const { createTimeline } = require('../helpers');
const Joi = require('joi');

const internals = {
  schema: {
    posts: Joi.string().min(1)
  }
};

exports.get = {
  handler: async (request, h) => {
    const client = request.server.app.client;
    const user = await client.users.query({ id: request.auth.credentials.id });
    const posts = user[0].posts;
    const post = await posts.find(post => post.id == request.params.postId);
    return post;
  }
};

exports.create = {
  handler: async (request, h) => {
    const client = request.server.app.client;
    const id = request.auth.artifacts.id;
    let user = await client.users.query({ id: id });
    const posts = await user[0].posts;
    const timeline = await user[0].timeline;
    const date = Date.now();
    const newPost = {
      date,
      comments: [],
      likes: [],
      post: request.payload.post,
      postID: id + date,
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      username: user[0].userName,
      imageURL: user[0].imageURL,
      id: request.auth.artifacts.id,
      path: [id + date]
    };
    await posts.unshift(newPost);
    await client.users.update({ id: id, posts, timeline });
    await createTimeline(id, client);
    await user[0].followers.map(async follower => {
      await createTimeline(follower, client);
    });
    user = await client.users.query({ id });
    return {
      posts: user[0].posts,
      timeline: user[0].timeline
    };
  },
  validate: {
    failAction: async (request, h, err) => {
      console.log(err)
    },
    payload: {
      post: internals.schema.posts
    }
  }
};

exports.update = {
  handler: async (request, h) => {
    const client = request.server.app.client;
    let user = await client.users.query({ id: request.auth.credentials.id });
    let posts = user[0].posts;
    const post = await posts.find(post => post.postID == request.params.postId);
    const postIndex = await posts.findIndex(x => x.postID == post.postID);
    posts[postIndex].post = request.payload.post;
    await client.users.update({ id: request.auth.credentials.id, posts });
    await createTimeline(request.auth.credentials.id, client);
    user = await client.users.query({id: request.auth.credentials.id})
    posts = user[0].posts;
    return posts[postIndex];
  },
  validate: {
    failAction: async (request, h, err) => {
      console.log(err)
    },
    payload: {
      post: internals.schema.posts
    }
  }
};

exports.delete = {
  handler: async (request, h) => {
    const client = request.server.app.client;
    const user = await client.users.query({ id: request.auth.credentials.id });
    const posts = user[0].posts;
    const post = await posts.find(post => post.postID == request.params.postId);
    const postIndex = await posts.findIndex(x => x.postID == post.postID);
    await posts.splice(postIndex, 1);
    await client.users.update({ id: request.auth.credentials.id, posts });
    await createTimeline(request.auth.credentials.id, client);
    return 'Post deleted';
  }
};
