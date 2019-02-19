'use strict';

const Lab = require('lab');
const Code = require('code');
const Server = require('../lib');

const internals = {};

const { describe, it } = exports.lab = Lab.script();

describe('Mock', () => {

    it('provisions a server', async () => {

        await Server.start;

    });
});
