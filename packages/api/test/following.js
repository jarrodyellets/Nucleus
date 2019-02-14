'use strict';

const Lab = require('lab');
const Code = require('code');
const { server } = require('../lib');

const internals = {};

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('Following', () => {

    it('Follows a user', async () => {

        const user = { id: '67890' };

        const Server = await server(true);

        const url = {
            method: 'POST',
            url: '/users/following/12345',
            credentials: user
        };

        const res = await Server.inject(url);

        expect(res.result).to.contain({
            following: ['12345']
        });
    });

    it('Unfollows a user', async () => {

        const user = { id: '12345' };

        const Server = await server(true);

        const url = {
            method: 'DELETE',
            url: '/users/following/11111',
            credentials: user
        };

        const res = await Server.inject(url);

        expect(res.result).to.contain({
            following: []
        });
    });
});
