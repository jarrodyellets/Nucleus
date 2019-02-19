'use strict';

const { server } = require('@realmark/api');
const Setup = require('@realmark/setup');

const internals = {};

const start = async () => {

    const app = await internals.provision();

    const Server = await server(app.dbase, app.vault);
    await Server.start();
};

internals.provision = async function () {

    const vault = await Setup.vault.generate();
    const dbase = await Setup.dbase();

    return { vault, dbase };
};

start();

module.exports = { start };
