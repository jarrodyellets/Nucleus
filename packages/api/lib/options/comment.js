'use strict';

const { returnClient } = require('../client');
const Joi = require('joi')

const internals = {
  schema: {
    comments: Joi.string().min(1)
  }
};

exports.getAll = {
  handler: async (request, h) => {
    const client = returnClient();
    const user = await client.users.query({id: request.params.userId});
    const posts = user[0].posts;
    const post = await posts.find(post => post.id == request.params.postId);
    return post.comments;
  }
}

exports.get = {
  handler: async (request, h) => {
    const client = returnClient();
    const user = await client.users.query({id: request.params.userId});
    const posts = user[0].posts;
    const post = await posts.find(post => post.id == request.params.postId);
    const comment = await post.comments.find(comment => comment.id == request.params.commentId);
    return comment;
  }
}

exports.create = {
  handler: async (request, h) => {
    const client = returnClient();
    const author = request.auth.credentials.id;
    const user = await client.users.query({id: request.params.userId});
    const posts = user[0].posts;
    const date = Date.now();
    const post = await posts.findIndex(post => post.id == request.params.postId);
    await posts[post].comments.push({
      date,
      author: author,
      comment: request.payload.comment,
      id: author + date
    });
    await client.users.update({id: request.params.userId, posts});
    return 'Comment Added';
  },
  validate: {
    payload: {
      comment: internals.schema.comments
    }
  }
}

exports.update = {
  handler: async (request, h) => {
    const client = returnClient();
    const user = await client.users.query({id: request.params.userId});
    const posts = user[0].posts;
    const post = await posts.find(post => post.id == request.params.postId);
    const postIndex = await posts.findIndex(x => x.id == post.id);
    const comment = await post.comments.findIndex(comment => comment.id == request.params.commentId);
    posts[postIndex].comments[comment].comment = request.payload.comment;
    await client.users.update({id: request.auth.credentials.id, posts});
    return 'Comment updated';
  },
  validate: {
    payload: {
      comment: internals.schema.comments
    }
  }
}

exports.delete = {
  handler: async (request, h) => {
    const client = returnClient();
    const user = await client.users.query({id: request.params.userId});
    const posts = user[0].posts;
    const post = await posts.find(post => post.id == request.params.postId);
    const postIndex = await posts.findIndex(x => x.id == post.id);
    const comment = await post.comments.findIndex(comment => comment.id == request.params.commentId);
    await posts[postIndex].comments.splice(comment, 1);
    await client.users.update({id: request.auth.credentials.id, posts});
    return 'Comment deleted';
  }
}