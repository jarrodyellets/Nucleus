'use strict';

const Lab = require('lab');
const Code = require('code');
const { server } = require('../lib/api');

const internals = {};

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('Login', () => {

    it('Logs user in', async (flags) => {

        const Server = await server(true);

        const url = {
            method: 'POST',
            url: '/login',
            payload: {
                username: 'roger',
                password: 'hello'
            }
        };

        const res1 = await Server.inject(url);

        await expect(res1.result).to.contain({
            userName: 'roger'
        });

    });
});
