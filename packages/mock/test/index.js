'use strict';

const Lab = require('lab');
const Code = require('code');
const Mock = require('..');

const internals = {};

const { describe, it } = exports.lab = Lab.script();

describe('Mock', () => {

    describe('server', () => {

        it('provisions a server', async () => {

            const mock = Mock();

            await mock.server();

        });
    });
});
