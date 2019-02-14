'use strict';

const Lab = require('lab');
const Code = require('code');
const { dbase } = require('../lib');

const internals = {};

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('Db client', () => {

    it('Returns db client', async () => {

        await dbase(true);
    });
});
