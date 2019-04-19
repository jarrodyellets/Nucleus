'use strict';

const Joi = require('joi');

const internals = {
    schema: {
        comments: Joi.string().min(1)
    }
};

exports.get = {
    handler: async (request, h) => {

        const path = request.query.path.split(',');
        const client = request.server.app.client;
        const user = await client.users.query({ id: request.params.userId });
        const posts = user[0].posts;
        let comment;
        const post = await posts.find((p) => p.postID === request.params.postId);
        if (!post){
            comment = await request.server.app.findComment(posts, path).post;
        }
        else {
            comment = await post.comments.find(
                (c) => c.postID === request.params.commentId
            );
        }

        return comment;
    }
};

exports.create = {
    handler: async (request, h) => {

        const client = request.server.app.client;
        const author = await client.users.query({
            id: request.auth.credentials.id
        });
        let user = await client.users.query({ id: request.params.userId });
        const posts = user[0].posts;
        const date = Date.now();
        const path = request.payload.path;
        let comment;
        const parentPost = await posts.findIndex((p) => p.postID === path[0]);
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
        };
        const postIndex = await posts.findIndex(
            (post) => post.postID === request.params.postId
        );
        if ((await postIndex) === -1) {
            comment = await request.server.app.findComment(posts, path).post;
            await comment.comments.push(newComment);
        }
        else {
            comment = await user[0].posts[parentPost];
            await posts[postIndex].comments.push(newComment);
        }

        await path.push(author[0].id + date);
        await client.users.update({ id: request.params.userId, posts, path });
        user = await client.users.query({ id: request.params.userId });
        const signedUser = await client.users.query({
            id: request.auth.credentials.id
        });
        const timeline = await request.server.app.createTimeline(request.auth.credentials.id, client);
        return {
            posts: user[0].posts,
            post: comment,
            currentPost: comment,
            signedPosts: signedUser[0].posts,
            timeline
        };
    },
    validate: {
        failAction: (request, h, err) => {

            throw err;
        },
        payload: Joi.object({
            comment: internals.schema.comments,
            path: Joi.array()
        })
    }
};

exports.update = {
    handler: async (request, h) => {

        const client = request.server.app.client;
        let user = await client.users.query({ id: request.params.userId });
        const posts = user[0].posts;
        let updatedPost;
        const path = request.payload.path;
        const postIndex = await posts.findIndex((x) => x.postID === request.params.postId);
        if ((await postIndex) === -1) {
            const comment = await request.server.app.findComment(posts, path).post;
            comment.post = request.payload.comment;
            updatedPost = await comment;
        }
        else {
            const commentIndex = await posts[postIndex].comments.findIndex(
                (c) => c.postID === request.params.commentId
            );
            posts[postIndex].comments[commentIndex].post = request.payload.comment;
            updatedPost = await posts[postIndex].comments[commentIndex];
        }

        await client.users.update({ id: request.auth.credentials.id, posts });
        await request.server.app.createTimeline(request.params.userId, client);
        user = await client.users.query({ id: request.params.userId });

        return updatedPost;
    },
    validate: {
        failAction: (request, h, err) => {

            throw err;
        },
        payload: Joi.object({
            comment: internals.schema.comments,
            path: Joi.array()
        })
    }
};

exports.delete = {
    handler: async (request, h) => {

        const client = request.server.app.client;
        let user = await client.users.query({ id: request.params.userId });
        const posts = user[0].posts;
        let comment;
        let postIndex;
        const post = await posts.find((p) => p.postID === request.params.postId);
        if (!post){
            comment = await request.server.app.findComment(posts, request.payload.path);
            postIndex = await comment.currentPost.comments.findIndex((x) => x.postID === request.params.commentId);
            comment.currentPost.comments.splice(postIndex, 1);
        }
        else {
            comment = await post.comments.findIndex(
                (c) => c.postID === request.params.commentId
            );
            postIndex = await posts.findIndex((x) => x.postID === post.postID);
            await posts[postIndex].comments.splice(comment, 1);
        }

        await client.users.update({ id: request.auth.credentials.id, posts });
        await request.server.app.createTimeline(request.params.userId, client);
        user = await client.users.query({ id: request.auth.credentials.id });
        return { posts: user[0].posts, timeline: user[0].timeline };
    }
};
