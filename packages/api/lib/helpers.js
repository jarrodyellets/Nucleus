'use strict';

const internals = {};

exports.createTimeline = async (id, client) => {

    let user = await client.users.query({ id });
    const timeline = [];
    for (const u of user[0].following) {
        const following = await client.users.query({ id: u });
        for (const post of following[0].posts) {
            await timeline.push(post);
        }
    }

    for (const post of user[0].posts) {
        await timeline.push(post);
    }

    await client.users.update({ id, timeline });
    user = await client.users.query({ id });
    return user[0].timeline;
};

exports.findComment = (posts, path) => {

    let comment = posts[0].comments;
    let post;
    let currentPost;
    for (let i = 1; i < path.length; ++i) {
        const commentID = path[i];
        const postIndex = comment.findIndex((y) => y.postID === commentID);
        post = comment[postIndex];
        comment = comment[postIndex].comments;
        if (i === path.length - 2) {
            currentPost = post;
        }

        if (path.length === 2) {
            currentPost = posts[0];
        }
    }

    return { post, currentPost };
};

exports.checkSignUpErrors = (details) => {

    const isUserNameEmpty = (details[0].message === '"username" is required');
    const isFirstNameEmpty = (details[0].message === '"firstName" is required');
    const isLastNameEmpty = (details[0].message === '"lastName" is required');
    const isNotEmail = (details[0].message === '"email" must be a valid email');
    const isEmailEmpty = (details[0].message === '"email" is required');
    const isPasswordEmpty = (details[0].message === '"password" is required');
    return { error: {
        isUserNameEmpty,
        isFirstNameEmpty,
        isLastNameEmpty,
        isNotEmail,
        isEmailEmpty,
        isPasswordEmpty
    } };
};
