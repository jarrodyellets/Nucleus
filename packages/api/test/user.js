'use strict';

const Lab = require('lab');
const Code = require('code');
const { server } = require('../lib/api');

const internals = {};

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('Sign Up', () => {

    it('sign up new user', async (flags) => {

        const Server  = await server();
        const url = {
            method: 'POST',
            url: '/users',
            payload: {
                username: 'jarrod',
                password: 'hello',
                firstName: 'Jarrod',
                lastName: 'Yellets',
                email: 'jarrod524@gmail.com',
                imageURL: 'https://www.jarrodyellets.com/images/penPro.jpg',
                location: 'Brussels',
                bio: 'Web Developer'
            }
        };
        const res1 = await Server.inject(url);

        expect(res1.result).to.equal({
            userName: 'jarrod',
            password: 'hello',
            firstName: 'Jarrod',
            lastName: 'Yellets',
            email: 'jarrod524@gmail.com',
            imageURL: 'https://www.jarrodyellets.com/images/penPro.jpg',
            location: 'Brussels',
            bio: 'Web Developer',
            id: String,
            posts: [],
            followers: [],
            following: [],
            timeline: [],
            login: true
        });


    });
});

