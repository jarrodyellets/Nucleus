'use strict';

const { returnClient } = require('../client');
const { createTimeline, findComment } = require('../helpers');
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
    const author = await client.users.query({id: request.auth.credentials.id});
    let user = await client.users.query({id: request.params.userId});
    const posts = user[0].posts;
    const date = Date.now();
    let path = request.payload.path;
    let comment;
    const parentPost = await posts.findIndex(p => p.postID == path[0]);
    const newComment = {
      date,
      author: author[0].id,
      post: request.payload.comment,
      postID: author[0].id + date,
      comments: [],
      likes: [],
      firstName: author[0].firstName,
      lastName: author[0].lastName,
      username: author[0].userName,
      imageURL: author[0].imageURL,
      id: user[0].id,
      path
    }
    const postIndex = await posts.findIndex(post => post.postID == request.params.postId);
    if (await postIndex === -1){
      comment = await findComment(posts, path);
      await comment.comments.push(newComment);
    } else {
      comment = await user[0].posts[parentPost]
      await posts[postIndex].comments.push(newComment);
    }
    await path.push(author[0].id + date);
    await client.users.update({id: request.params.userId, posts, path});
    user = await client.users.query({id: request.params.userId})
    const signedUser = await client.users.query({id: request.auth.credentials.id})
    const timeline = await createTimeline(request.auth.credentials.id);
    return {
      posts: user[0].posts, post: comment, signedPosts: signedUser[0].posts, timeline
    };
  },
  // validate: {
  //   payload: {
  //     comment: internals.schema.comments
  //   }
  // }
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