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

    it('Sends a message', async () => {

        const user = { id: '11111' };

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

        const url1 = {
            method: 'POST',
            url: '/users/12345/mail',
            credentials: user,
            payload: {
                message: 'Going to be home late tonight',
                subject: 'Running late'
            }
        };
        const url2 = {
            method: 'POST',
            url: '/users/12345/mail',
            credentials: user,
            payload: {
                message: 'Going to be home late tonight',
                subject: 123
            }
        };

        const res1 = await Server.inject(url1);
        const res2 = await Server.inject(url2);

        expect(res1.result).to.part.contain({
            recipient: {
                mail: {
                    recieved: [
                        {
                            message: 'Going to be home late tonight'
                        }
                    ]
                }
            }
        });
        expect(res2.result).to.contain({
            statusCode: 400,
            message: 'child "subject" fails because ["subject" must be a string]'
        });
    });

    it('Deletes a message', async () => {

        const user = { id: '11111' };

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

        const url = {
            method: 'DELETE',
            url: '/users/11111/mail/178c1c291ea44409b48d12c6a7cec76f1550740368618',
            credentials: user
        };

        const res = await Server.inject(url);

        expect(res.result).to.equal('Message deleted');
    });
});

internals.provision = async function () {

    const vault = await Setup.vault.generate();
    const dbase = await Setup.dbase(true);

    return { vault, dbase };
};
