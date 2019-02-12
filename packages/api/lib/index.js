'use strict';

const { server } = require('./api');

const start = async () => {

    const provision = await server(true);
    await provision.start();
};

start();
