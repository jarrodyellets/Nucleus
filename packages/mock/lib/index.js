'use strict';

const { server } = require('@realmark/api');
const Setup = require('@realmark/setup');

const internals = {};

exports.setup =  {

    start: async () => {

        const app = await internals.provision();

        const Server = await server(app.dbase, app.vault);

        await Server.start();

        await console.log('Server has started');

        process.on('SIGINT', async () => {

            await Server.stop();
            await console.log('Server has stopped');

        });

        return { server };
    }
};

internals.provision = async function () {

    const vault = await Setup.vault.generate();
    const dbase = await Setup.dbase();

    return { vault, dbase };
};



