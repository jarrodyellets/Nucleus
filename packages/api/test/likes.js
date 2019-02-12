'use strict';

const Lab = require('lab');
const Code = require('code');
const { server } = require('../lib/api');

const internals = {};

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('Likes', () => {

    it('Adds a like', async () => {

        const user = { id: '12345' };

        const Server = await server(true);

        const url = {
            method: 'POST',
            url: '/users/11111/posts/111111549876483373/likes',
            credentials: user,
            payload: {
                path: ['111111549876483373']
            }
        };

        const res = await Server.inject(url);

        expect(res.result).to.part.contain({
            posts: [{
                post: 'what is everyone doing?',
                likes: ['12345']
            }]
        });
    });
});
