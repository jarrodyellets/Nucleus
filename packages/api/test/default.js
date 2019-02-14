'use strict';

const Lab = require('lab');
const Code = require('code');
const { server } = require('../lib');

const internals = {};

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('Default', () => {

    it('Redirects to Home Page', async () => {

        const Server = await server(false);

        const url = {
            method: 'GET',
            url: '/test'
        };

        const res = await Server.inject(url);

        expect(res.result).to.be.a.string();
    });
});
