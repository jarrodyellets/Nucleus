'use strict';

const { server } = require('.');

const start = async () => {

    const provision = await server(true);
    await provision.start();
};

start();
