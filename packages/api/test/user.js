'use strict';

const Lab = require('lab');
const Code = require('code');
const { server } = require('../lib/api');

const internals = {};

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('User', () => {

    it('sign up new user', async (flags) => {

        const Server = await server(false);

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

        const id = await res1.result.id;

        expect(res1.result).to.equal({
            userName: 'jarrod',
            firstName: 'Jarrod',
            lastName: 'Yellets',
            email: 'jarrod524@gmail.com',
            imageURL: 'https://www.jarrodyellets.com/images/penPro.jpg',
            location: 'Brussels',
            bio: 'Web Developer',
            id,
            posts: [],
            followers: [],
            following: [],
            timeline: [],
            login: true
        });


    });

    it('user forgets email', async (flags) => {

        const Server = await server(false);

        const url = {
            method: 'POST',
            url: '/users',
            payload: {
                username: 'jarrod',
                password: 'hello',
                firstName: 'Jarrod',
                lastName: 'Yellets',
                imageURL: 'https://www.jarrodyellets.com/images/penPro.jpg',
                location: 'Brussels',
                bio: 'Web Developer'
            }
        };

        const res2 = await Server.inject(url);

        expect(res2.result).to.equal({
            error: {
                isUserNameEmpty: false,
                isFirstNameEmpty: false,
                isLastNameEmpty: false,
                isNotEmail: false,
                isEmailEmpty: true,
                isPasswordEmpty: false
            }
        });


    });

    it('Gets all users', async () => {

        const Server = await server(true);

        const user = {
            roger: {
                username: 'roger',
                password: 'hello'
            }
        };

        const url = {
            method: 'GET',
            url: '/users',
            credentials: user
        };

        const res3 = await Server.inject(url);

        await expect(res3.result).to.part.include([{ userName: 'roger' }]);

    });
});




