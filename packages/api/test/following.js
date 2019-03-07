'use strict';

const Lab = require('lab');
const Code = require('code');
const { server } = require('../lib');
const Setup = require('@realmark/setup');

const internals = {};

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('Following', () => {

    it('Follows a user', async () => {

        const user = { id: '67890' };

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

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

    it('Gets following', async () => {

        const user = { id: '12345' };

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

        const url = {
            method: 'GET',
            url: '/users/following/12345',
            credentials: user
        };

        const res = await Server.inject(url);

        expect(res.result).to.part.contain({
            following: [[{
                id: '11111'
            }]]
        });
    });

    it('Gets followers', async () => {

        const user = { id: '12345' };

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

        const url = {
            method: 'GET',
            url: '/users/followers/12345',
            credentials: user
        };

        const res = await Server.inject(url);

        expect(res.result).to.part.contain({
            followers: [[{
                id: '11111'
            }]]
        });
    });

    it('Unfollows a user', async () => {

        const user = { id: '12345' };

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

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

internals.provision = async function () {

    const vault = await Setup.vault.generate();
    const dbase = await Setup.dbase(true);

    return { vault, dbase };
};
