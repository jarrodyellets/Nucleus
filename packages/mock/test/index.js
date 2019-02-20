'use strict';

const Lab = require('lab');
const Code = require('code');
const { setup } = require('..');

const internals = {};

const { describe, it } = exports.lab = Lab.script();

describe('Mock', () => {

    it('starts a server', async () => {

        await setup.start();
    });
});
