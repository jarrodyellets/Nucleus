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
        followers: ['11111'],
        following: ['11111'],
        timeline: [],
        password: Bcrypt.hashSync('hello', 10),
        id: '12345'
    });

    await internals.client.users.insert({
        userName: 'jessica',
        firstName: 'Jessica',
        lastName: 'Rabbit',
        email: 'jessica@acme.com',
        imageURL: 'https://upload.wikimedia.org/wikipedia/en/8/8d/Jessica_Rabbit.png',
        location: 'Toon Town',
        bio: 'Singer',
        posts: [],
        followers: ['12345'],
        following: ['12345'],
        timeline: [],
        password: Bcrypt.hashSync('hello', 10),
        id: '11111'
    });

    await internals.client.users.insert({
        userName: 'eddie',
        firstName: 'Eddie',
        lastName: 'Valiant',
        email: 'eddie@acme.com',
        imageURL: 'https://pbs.twimg.com/profile_images/471479873895411712/ZtnPcfaR_400x400.jpeg',
        location: 'Los Angeles',
        bio: 'Private Detective',
        posts: [],
        followers: [],
        following: [],
        timeline: [],
        password: Bcrypt.hashSync('hello', 10),
        id: '67890'
    });
};

module.exports = { dbase };
