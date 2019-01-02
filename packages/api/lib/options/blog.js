'use strict';

const { returnClient } = require('../client');
const Joi = require('joi');

const internals = {
  schema: {
    posts: Joi.string().min(1)
  }
}

exports.get = {
  handler: async (request, h) => {
    const client = returnClient();
    const user = await client.users.query({id: request.auth.credentials.id});
    const posts = user[0].posts;
    const post = await posts.find(post => post.id == request.params.postId);
    return post;
  }
}

exports.create = {
  handler: async (request, h) => {
    const client = returnClient();
    const id = request.auth.artifacts.id;
    let user = await client.users.query({id: id});
    const posts = await user[0].posts;
    const timeline = await user[0].timeline;
    const date = Date.now();
    const newPost  = {
      date,
      comments: [],
      likes: [],
      post: request.payload.post,
      id: id + date,
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      username: user[0].userName,
      imageURL: user[0].imageURL
    }
    await posts.unshift(newPost);
    await timeline.unshift(newPost);
    await client.users.update({id: id, posts, timeline});
    user = await client.users.query({id})
    return {
      posts: user[0].posts,
      timeline: user[0].timeline
    }
  },
  validate: {
    payload: {
      post: internals.schema.posts
    }
  }
}

exports.update = {
  handler: async (request, h) => {
    const client = returnClient();
    const user = await client.users.query({id: request.auth.credentials.id});
    const posts = user[0].posts;
    const post = await posts.find(post => post.id == request.params.postId);
    const postIndex = await posts.findIndex(x => x.id == post.id)
    posts[postIndex].post = request.payload.post; 
    await client.users.update({id: request.auth.credentials.id, posts});
    return 'Post updated';
  },
  validate: {
    payload: {
      post: internals.schema.posts
    }
  }
}

exports.delete = {
  handler: async (request, h) => {
    const client = returnClient();
    const user = await client.users.query({id: request.auth.credentials.id});
    const posts = user[0].posts;
    const post = await posts.find(post => post.id == request.params.postId);
    const postIndex = await posts.findIndex(x => x.id == post.id);
    await posts.splice(postIndex, 1);
    await client.users.update({id: request.auth.credentials.id, posts});
    return 'Post deleted';
  }
}