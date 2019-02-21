'use strict';

const Lab = require('lab');
const Code = require('code');
const { server } = require('../lib');
const Setup = require('@realmark/setup');

const internals = {};

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('Mail', () => {

    it('Gets a message', async () => {

        const user = { id: '11111' };

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

        const url = {
            method: 'GET',
            url: '/users/11111/mail/178c1c291ea44409b48d12c6a7cec76f1550740368618',
            credentials: user
        };

        const res = await Server.inject(url);

        expect(res.result).to.contain({
            message: 'Headed to the store later, need anything?'
        });

    });
});

internals.provision = async function () {

    const vault = await Setup.vault.generate();
    const dbase = await Setup.dbase(true);

    return { vault, dbase };
};
