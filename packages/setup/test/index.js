'use strict';

const Lab = require('lab');
const Code = require('code');
const { dbase, vault } = require('../lib');

const internals = {};

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('Db client', () => {

    it('Returns db client', async () => {

        const res1 = await dbase(true);

        const res2 = await vault.generate();

        const secret = res2.vendors.auth.secret;

        expect(res1).to.contain({
            _database: 'blog'
        });
        expect(res2).to.contain({
            vendors: {
                auth: {
                    secret
                }
            }
        });
    });
});
