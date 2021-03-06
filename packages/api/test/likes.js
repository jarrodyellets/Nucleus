'use strict';

const Lab = require('lab');
const Code = require('code');
const { server } = require('../lib');
const Setup = require('@realmark/setup');

const internals = {};

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('Likes', () => {

    it('Likes a post', async () => {

        const user1 = { id: '12345' };
        const user2 = { id: '11111' };

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

        const url1 = {
            method: 'POST',
            url: '/users/11111/posts/111111549876483373/likes',
            credentials: user1,
            payload: {
                path: ['111111549876483373']
            }
        };

        const url2 = {
            method: 'POST',
            url: '/users/11111/posts/111111549958262407/likes',
            credentials: user2,
            payload: {
                path: ['111111549876483373', '123451549958237476', '111111549958262407']
            }
        };

        const res1 = await Server.inject(url1);
        const res2 = await Server.inject(url2);

        expect(res1.result).to.part.contain({
            posts: [{
                post: 'what is everyone doing?',
                likes: ['12345']
            }]
        });
        expect(res2.result).to.part.contain({
            post: {
                post: 'Of course you are',
                likes: ['12345', '11111']
            }
        });
    });

    it('Dislikes a post', async () => {

        const user1 = { id: '12345' };
        const user2 = { id: '11111' };

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

        const url1 = {
            method: 'DELETE',
            url: '/users/11111/posts/111111549958262407/likes',
            credentials: user1,
            payload: {
                path: ['111111549876483373', '123451549958237476', '111111549958262407']
            }
        };

        const url2 = {
            method: 'DELETE',
            url: '/users/12345/posts/123451549876459506/likes',
            credentials: user2,
            payload: {
                path: ['123451549876459506']
            }
        };

        const url3 = {
            method: 'DELETE',
            url: '/users/11111/posts/123451549958237476/likes',
            credentials: user2,
            payload: {
                path: ['111111549876483373', '123451549958237476']
            }
        };

        const res1 = await Server.inject(url1);
        const res2 = await Server.inject(url2);
        const res3 = await Server.inject(url3);

        expect(res1.result).to.part.contain({
            post: {
                post: 'Of course you are',
                likes: []
            }
        });
        expect(res2.result).to.part.contain({
            post: {
                post: 'hello all',
                likes: []
            }
        });
        expect(res3.result).to.part.contain({
            post: {
                post: 'Eating carrot cake!',
                likes: []
            }
        });
    });
});

internals.provision = async function () {

    const vault = await Setup.vault.generate();
    const dbase = await Setup.dbase(true);

    return { vault, dbase };
};
