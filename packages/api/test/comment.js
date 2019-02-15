'use strict';

const Lab = require('lab');
const Code = require('code');
const { server } = require('../lib');
const Setup = require('@realmark/setup');

const internals = {};

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('Comment', () => {

    it('Gets a comment', async () => {

        const user = { id: '12345' };

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

        const url1 = {
            method: 'GET',
            url: '/users/11111/posts/111111549876483373/comments/123451549958237476?path=111111549876483373,123451549958237476',
            credentials: user
        };

        const url2 = {
            method: 'GET',
            url: '/users/11111/posts/11111549876483373/comments/111111549958262407?path=111111549876483373,123451549958237476,111111549958262407',
            credentials: user
        };

        const res1 = await Server.inject(url1);
        const res2 = await Server.inject(url2);

        expect(res1.result).to.contain({
            post: 'Eating carrot cake!'
        });
        expect(res2.result).to.contain({
            post: 'Of course you are'
        });
    });

    it('Adds a comment', async () => {

        const user = { id: '12345' };

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

        const url1 = {
            method: 'POST',
            url: '/users/12345/posts/123451549876459506/comments',
            credentials: user,
            payload: {
                comment: 'Hello back!',
                path: ['123451549876459506']
            }
        };

        const url2 = {
            method: 'POST',
            url: '/users/11111/posts/111111549958262407/comments',
            credentials: user,
            payload: {
                comment: 'Yep!',
                path: ['111111549876483373', '123451549958237476', '111111549958262407']
            }
        };

        const url3 = {
            method: 'POST',
            url: '/users/11111/posts/111111549958262407/comments',
            credentials: user,
            payload: {
                comment: 123,
                path: ['111111549876483373', '123451549958237476', '111111549958262407']
            }
        };

        const res1 = await Server.inject(url1);
        const res2 = await Server.inject(url2);
        const res3 = await Server.inject(url3);

        expect(res1.result).to.part.contain({
            post: {
                comments: [{
                    post: 'Hello back!'
                }]
            }
        });
        expect(res2.result).to.part.contain({
            post: {
                comments: [{
                    post: 'Yep!'
                }]
            }
        });
        expect(res3.result).to.contain({
            statusCode: 400
        });
    });

    it('Updates a comment', async () => {

        const user = { id: '12345' };

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

        const url1 = {
            method: 'PUT',
            url: '/users/11111/posts/111111549876483373/comments/123451549958237476',
            credentials: user,
            payload: {
                comment: 'Eating carrot cake....and coffee!',
                path: ['111111549876483373', '123451549958237476']
            }
        };

        const url2 = {
            method: 'PUT',
            url: '/users/11111/posts/11111549876483373/comments/111111549958262407',
            credentials: user,
            payload: {
                comment: 'are you not at work?',
                path: ['111111549876483373', '123451549958237476', '111111549958262407']
            }
        };

        const url3 = {
            method: 'PUT',
            url: '/users/11111/posts/11111549876483373/comments/111111549958262407',
            credentials: user,
            payload: {
                comment: 123,
                path: ['111111549876483373', '123451549958237476', '111111549958262407']
            }
        };

        const res1 = await Server.inject(url1);
        const res2 = await Server.inject(url2);
        const res3 = await Server.inject(url3);

        expect(res1.result).to.contain({
            post: 'Eating carrot cake....and coffee!'
        });
        expect(res2.result).to.contain({
            post: 'are you not at work?'
        });
        expect(res3.result).to.contain({
            statusCode: 400
        });
    });

    it('Deletes a comment', async () => {

        const user = { id: '12345' };

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

        const url1 = {
            method: 'DELETE',
            url: '/users/11111/posts/111111549876483373/comments/123451549958237476',
            credentials: user,
            payload: {
                path: ['111111549876483373', '123451549958237476']
            }
        };

        const url2 = {
            method: 'DELETE',
            url: '/users/11111/posts/11111549876483373/comments/111111549958262407',
            credentials: user,
            payload: {
                path: ['111111549876483373', '123451549958237476', '111111549958262407']
            }
        };

        const res1 = await Server.inject(url1);
        const res2 = await Server.inject(url2);

        expect(res1.result).to.part.contain({
            posts: [{
                comments: []
            }]
        });
        expect(res2.result).to.part.contain({
            posts: [{
                comments: [{
                    comments: []
                }]
            }]
        });
    });
});

internals.provision = async function () {

    const vault = await Setup.vault.generate();
    const dbase = await Setup.dbase(true);

    return { vault, dbase };
};
