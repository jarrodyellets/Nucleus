'use strict';

const Db = require('@realmark/db');
const Bcrypt = require('bcrypt');

const internals = {
    client: {}
};

const dbase = async (seed) => {

    const server = await Db.server();

    await server.start();

    internals.client = new Db.Client({
        location: server.info.uri,
        database: 'blog'
    });

    await internals.client.create();

    const create = {
        id: {
            type: 'uuid'
        }
    };

    await internals.client.table('users', {
        create
    });

    seed && await internals.seed();

    return internals.client;
};

internals.seed = async () => {

    await internals.client.users.insert({
        userName: 'roger',
        firstName: 'Roger',
        lastName: 'Rabbit',
        email: 'roger@acme.com',
        imageURL: 'https://vignette.wikia.nocookie.net/disney/images/b/b6/Rogerpoint.png/revision/latest?cb=20131219044547',
        location: 'Toon Town',
        bio: 'Actor',
        posts: [],
        followers: [],
        following: [],
        timeline: [],
        password: Bcrypt.hashSync('hello', 10),
        id: '12345'
    });
};

module.exports = { dbase };
