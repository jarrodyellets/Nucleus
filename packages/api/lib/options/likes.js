'use strict';

const { createTimeline, findComment } = require('../helpers');

const internals = {};

exports.create = {
    handler: async (request, h) => {

        const client = request.server.app.client;
        let user = await client.users.query({ id: request.params.userId });
        const path = request.payload.path;
        const posts = user[0].posts;
        let comment;
        let currentPost;
        const postIndex = await posts.findIndex(
            (x) => x.postID === request.params.postId
        );
        const parentPost = await posts.findIndex((p) => p.postID === path[0]);
        if ((await postIndex) === -1) {
            const comments = await findComment(posts, path);
            comment = comments.post;
            currentPost = comments.currentPost;
            await comment.likes.push(request.auth.credentials.id);
        }
        else {
            comment, (currentPost = user[0].posts[parentPost]);
            await posts[postIndex].likes.push(request.auth.credentials.id);
        }

        await client.users.update({ id: request.params.userId, posts });
        user = await client.users.query({ id: request.params.userId });
        const signedUser = await client.users.query({
            id: request.auth.credentials.id
        });
        const timeline = await createTimeline(request.auth.credentials.id, client);
        return {
            posts: user[0].posts,
            post: comment,
            currentPost,
            signedPosts: signedUser[0].posts,
            timeline
        };
    }
};

exports.delete = {
    handler: async (request, h) => {

        const client = request.server.app.client;
        let user = await client.users.query({ id: request.params.userId });
        const path = request.payload.path;
        const posts = user[0].posts;
        let comment;
        let currentPost;
        const postIndex = await posts.findIndex(
            (x) => x.postID === request.params.postId
        );
        const parentPost = await posts.findIndex((p) => p.postID === path[0]);
        if ((await postIndex) === -1) {
            const comments = await findComment(posts, path);
            comment = comments.post;
            currentPost = comments.currentPost;
        }
        else {
            comment, (currentPost = user[0].posts[parentPost]);
        }

        const likeIndex = await comment.likes.find(
            (like) => like === request.auth.credentials.id
        );
        await comment.likes.splice(likeIndex, 1);
        await client.users.update({ id: request.params.userId, posts });
        user = await client.users.query({ id: request.params.userId });
        const signedUser = await client.users.query({
            id: request.auth.credentials.id
        });
        const timeline = await createTimeline(request.auth.credentials.id, client);
        return {
            posts: user[0].posts,
            post: comment,
            currentPost,
            signedPosts: signedUser[0].posts,
            timeline
        };
    }
};
