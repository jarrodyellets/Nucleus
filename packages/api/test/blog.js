'use strict';

const Lab = require('lab');
const Code = require('code');
const { server } = require('../lib');
const Setup = require('@realmark/setup');

const internals = {};

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('Blog', () => {

    it('Gets a blog post', async () => {

        const user = { id: '12345' };

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

        const url = {
            method: 'GET',
            url: '/users/12345/posts/123451549876459506',
            credentials: user
        };

        const res = await Server.inject(url);

        expect(res.result).to.contain({
            post: 'hello all'
        });
    });

    it('Creates a blog post', async () => {

        const user = { id: '12345' };

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

        const url1 = {
            method: 'POST',
            url: '/users/posts',
            credentials: user,
            payload: {
                post: 'Testing a post!'
            }
        };

        const url2 = {
            method: 'POST',
            url: '/users/posts',
            credentials: user,
            payload: {
                post: 123
            }
        };

        const res1 = await Server.inject(url1);
        const res2 = await Server.inject(url2);

        expect(res1.result).to.part.contain({
            posts: [{
                post: 'Testing a post!'
            }]
        });
        expect(res2.result).to.contain({
            statusCode: 400,
            message: 'child "post" fails because ["post" must be a string]'
        });
    });

    it('Updates a blog post', async () => {

        const user = { id: '12345' };

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

        const url1 = {
            method: 'PUT',
            url: '/users/posts/123451549876459506',
            credentials: user,
            payload: {
                post: 'Updating this post!'
            }
        };

        const url2 = {
            method: 'PUT',
            url: '/users/posts/123451549876459506',
            credentials: user,
            payload: {
                post: 123
            }
        };

        const res1 = await Server.inject(url1);
        const res2 = await Server.inject(url2);

        expect(res1.result).to.contain({
            post: 'Updating this post!',
            postID: '123451549876459506'
        });
        expect(res2.result).to.contain({
            statusCode: 400,
            message: 'child "post" fails because ["post" must be a string]'
        });
    });

    it('Deletes a post', async () => {

        const user = { id: '12345' };

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

        const url = {
            method: 'DELETE',
            url: '/users/posts/123451549876459506',
            credentials: user
        };

        const res = await Server.inject(url);

        expect(res.result).to.equal('Post deleted');
    });
});

internals.provision = async function () {

    const vault = await Setup.vault.generate();
    const dbase = await Setup.dbase(true);

    return { vault, dbase };
};
