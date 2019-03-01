'use strict';

const Db = require('@realmark/db');
const Bcrypt = require('bcrypt');
const Cryptiles = require('cryptiles');

const internals = {
    client: {}
};

exports.dbase = async (seed) => {

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

    if (seed){
        await internals.seed();
    }

    return internals.client;
};

exports.vault = {
    generate: function () {

        const vault = {
            vendors: {
                auth: {
                    secret: internals.token()
                }
            }
        };

        return vault;
    }
};

internals.token = function () {

    return Cryptiles.randomBits(256).toString('hex');
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
        posts: [
            {
                date: 1549876459506,
                comments: [],
                likes: ['11111'],
                post: 'hello all',
                postID: '123451549876459506',
                firstName: 'Roger',
                lastName: 'Rabbit',
                username: 'roger',
                imageURL: 'https://vignette.wikia.nocookie.net/disney/images/b/b6/Rogerpoint.png/revision/latest?cb=20131219044547',
                id: '12345',
                path: [
                    '123451549876459506'
                ]
            }
        ],
        followers: [
            '11111'
        ],
        following: [
            '11111'
        ],
        mail: {
            sent: [
                {
                    messageID: '178c1c291ea44409b48d12c6a7cec76f1550740368618',
                    id: '12345',
                    message: 'Headed to the store later, need anything?',
                    date: 1550740368618,
                    from: 'Roger Rabbit',
                    to: 'Jessica Rabbit',
                    subject: 'Quick question'
                }
            ],
            received: []
        },
        timeline: [
            {
                date: 1549876483373,
                comments: [
                    {
                        date: 1549958237476,
                        author: '12345',
                        post: 'Eating carrot cake!',
                        postID: '123451549958237476',
                        comments: [
                            {
                                date: 1549958262407,
                                author: '11111',
                                post: 'Of course you are',
                                postID: '111111549958262407',
                                comments: [],
                                likes: [
                                    '12345'
                                ],
                                firstName: 'Jessica',
                                lastName: 'Rabbit',
                                username: 'jessica',
                                imageURL: 'https://upload.wikimedia.org/wikipedia/en/8/8d/Jessica_Rabbit.png',
                                id: '11111',
                                path: [
                                    '111111549876483373',
                                    '123451549958237476',
                                    '111111549958262407'
                                ]
                            }
                        ],
                        likes: [
                            '11111'
                        ],
                        firstName: 'Roger',
                        lastName: 'Rabbit',
                        username: 'roger',
                        imageURL: 'https://vignette.wikia.nocookie.net/disney/images/b/b6/Rogerpoint.png/revision/latest?cb=20131219044547',
                        id: '11111',
                        path: [
                            '111111549876483373',
                            '123451549958237476'
                        ]
                    }
                ],
                likes: [],
                post: 'what is everyone doing?',
                postID: '111111549876483373',
                firstName: 'Jessica',
                lastName: 'Rabbit',
                username: 'jessica',
                imageURL: 'https://upload.wikimedia.org/wikipedia/en/8/8d/Jessica_Rabbit.png',
                id:'11111',
                path: [
                    '111111549876483373'
                ]
            },
            {
                date: 1549876459506,
                comments: [],
                likes: ['11111'],
                post: 'hello all',
                postID: '123451549876459506',
                firstName: 'Roger',
                lastName: 'Rabbit',
                username: 'roger',
                imageURL: 'https://vignette.wikia.nocookie.net/disney/images/b/b6/Rogerpoint.png/revision/latest?cb=20131219044547',
                id: '12345',
                path: [
                    '123451549876459506'
                ]
            }
        ],
        password: '$2b$10$xim8BiMSjrotQk0Co9JDOuGowDjNae0S1MMeRj5t.Z767iM4Tdn1C',
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
        posts: [
            {
                date: 1549876483373,
                comments: [
                    {
                        date: 1549958237476,
                        author: '12345',
                        post: 'Eating carrot cake!',
                        postID: '123451549958237476',
                        comments: [
                            {
                                date: 1549958262407,
                                author: '11111',
                                post: 'Of course you are',
                                postID: '111111549958262407',
                                comments: [],
                                likes: [
                                    '12345'
                                ],
                                firstName: 'Jessica',
                                lastName: 'Rabbit',
                                username: 'jessica',
                                imageURL: 'https://upload.wikimedia.org/wikipedia/en/8/8d/Jessica_Rabbit.png',
                                id: '11111',
                                path: [
                                    '111111549876483373',
                                    '123451549958237476',
                                    '111111549958262407'
                                ]
                            }
                        ],
                        likes: [
                            '11111'
                        ],
                        firstName: 'Roger',
                        lastName: 'Rabbit',
                        username: 'roger',
                        imageURL: 'https://vignette.wikia.nocookie.net/disney/images/b/b6/Rogerpoint.png/revision/latest?cb=20131219044547',
                        id: '11111',
                        path: [
                            '111111549876483373',
                            '123451549958237476'
                        ]
                    }
                ],
                likes: [],
                post: 'what is everyone doing?',
                postID: '111111549876483373',
                firstName: 'Jessica',
                lastName: 'Rabbit',
                username: 'jessica',
                imageURL: 'https://upload.wikimedia.org/wikipedia/en/8/8d/Jessica_Rabbit.png',
                id: '11111',
                path: [
                    '111111549876483373'
                ]
            }
        ],
        followers: [
            '12345'
        ],
        following: [
            '12345'
        ],
        mail: {
            sent: [],
            received: [
                {
                    messageID: '178c1c291ea44409b48d12c6a7cec76f1550740368618',
                    id: '12345',
                    message: 'Headed to the store later, need anything?',
                    date: 1550740368618,
                    from: 'Roger Rabbit',
                    to: 'Jessica Rabbit',
                    subject: 'Quick question'
                }
            ]
        },
        timeline: [
            {
                date: 1549876459506,
                comments: [],
                likes: ['11111'],
                post: 'hello all',
                postID: '123451549876459506',
                firstName: 'Roger',
                lastName: 'Rabbit',
                username: 'roger',
                imageURL: 'https://vignette.wikia.nocookie.net/disney/images/b/b6/Rogerpoint.png/revision/latest?cb=20131219044547',
                id: '12345',
                path: [
                    '123451549876459506'
                ]
            },
            {
                date: 1549876483373,
                comments: [
                    {
                        date: 1549958237476,
                        author: '12345',
                        post: 'Eating carrot cake!',
                        postID: '123451549958237476',
                        comments: [
                            {
                                date: 1549958262407,
                                author: '11111',
                                post: 'Of course you are',
                                postID: '111111549958262407',
                                comments: [],
                                likes: [],
                                firstName: 'Jessica',
                                lastName: 'Rabbit',
                                username: 'jessica',
                                imageURL: 'https://upload.wikimedia.org/wikipedia/en/8/8d/Jessica_Rabbit.png',
                                id: '11111',
                                path: [
                                    '111111549876483373',
                                    '123451549958237476',
                                    '111111549958262407'
                                ]
                            }
                        ],
                        likes: [
                            '11111'
                        ],
                        firstName: 'Roger',
                        lastName: 'Rabbit',
                        username: 'roger',
                        imageURL: 'https://vignette.wikia.nocookie.net/disney/images/b/b6/Rogerpoint.png/revision/latest?cb=20131219044547',
                        id: '11111',
                        path: [
                            '111111549876483373',
                            '123451549958237476'
                        ]
                    }
                ],
                likes: [],
                post: 'what is everyone doing?',
                postID: '111111549876483373',
                firstName: 'Jessica',
                lastName: 'Rabbit',
                username: 'jessica',
                imageURL: 'https://upload.wikimedia.org/wikipedia/en/8/8d/Jessica_Rabbit.png',
                id: '11111',
                path: [
                    '111111549876483373'
                ]
            }
        ],
        password: Bcrypt.hashSync('hello', 10),
        id: '11111',
        path: [
            '111111549876483373',
            '123451549958237476',
            '111111549958262407'
        ]
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

