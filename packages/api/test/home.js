'use strict';

const Lab = require('lab');
const Code = require('code');
const { server } = require('../lib');
const Setup = require('@realmark/setup');

const internals = {};

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('Home', () => {

    it('Returns home page', async () => {

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

        const url = {
            method: 'GET',
            url: '/'
        };

        const res = await Server.inject(url);

        expect(res.result).to.be.a.string();
    });

    it('Returns manifest', async () => {

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

        const url = {
            method: 'GET',
            url: '/manifest.json'
        };

        const res = await Server.inject(url);

        expect(res.result).to.be.a.string();
    });
});

internals.provision = async function () {

    const vault = await Setup.vault.generate();
    const dbase = await Setup.dbase(false);

    return { vault, dbase };
};
