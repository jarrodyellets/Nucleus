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

        const url1 = {
            method: 'POST',
            url: '/login',
            payload: {
                username: 'roger',
                password: 'hello'
            }
        };

        const url2 = {
            method: 'POST',
            url: '/login',
            payload: {
                username: '',
                password: 'hello'
            }
        };

        const url3 = {
            method: 'POST',
            url: '/login',
            payload: {
                username: 'roger',
                password: 'password'
            }
        };

        const res1 = await Server.inject(url1);
        const res2 = await Server.inject(url2);
        const res3 = await Server.inject(url3);

        expect(res1.result).to.contain({
            userName: 'roger'
        });

        expect(res2.result).to.contain({
            error: 'Invalid Username'
        });

        expect(res3.result).to.contain({
            error: 'Invalid Password'
        });
    });

    it('Logs user out', async () => {

        const user = { id: '12345' };

        const Server = await server(true);

        const url = {
            method: 'GET',
            url: '/logout',
            credentials: user
        };

        const res = await Server.inject(url);

        expect(res.result).to.equal({
            login: false
        });
    });

    it('Checks if user is logged in', async () => {

        const user = { id: '12345' };

        const Server = await server(true);

        const url1 = {
            method: 'GET',
            url: '/checklogin',
            credentials: user
        };

        const url2 = {
            method: 'GET',
            url: '/checklogin'
        };

        const res1 = await Server.inject(url1);
        const res2 = await Server.inject(url2);

        expect(res1.result).to.contain({
            userName: 'roger',
            firstName: 'Roger',
            lastName: 'Rabbit'
        });
        expect(res2.result).to.equal({
            login: false
        });
    });
});
