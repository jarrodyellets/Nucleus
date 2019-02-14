'use strict';

const Lab = require('lab');
const Code = require('code');
const { server } = require('../lib');

const internals = {};

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('Home', () => {

    it('Returns home page', async () => {

        const Server = await server(false);

        const url = {
            method: 'GET',
            url: '/'
        };

        const res = await Server.inject(url);

        expect(res.result).to.be.a.string();
    });

    it('Returns manifest', async () => {

        const Server = await server(false);

        const url = {
            method: 'GET',
            url: '/manifest.json'
        };

        const res = await Server.inject(url);

        expect(res.result).to.be.a.string();
    });
});
