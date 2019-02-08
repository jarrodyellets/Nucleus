'use strict';

const Lab = require('lab');
const Code = require('code');
const { server } = require('../lib/api');

const internals = {};

const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('User', () => {

    it('sign up new user', async (flags) => {

        const Server = await server(true);

        const url1 = {
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

        const url2 = {
            method: 'POST',
            url: '/users',
            payload: {
                username: 'roger',
                password: 'hello',
                firstName: 'Roger',
                lastName: 'Rabbit',
                email: 'roger@acme.com',
                imageURL: 'https://www.jarrodyellets.com/images/penPro.jpg',
                location: 'Toon Town',
                bio: 'Actor'
            }
        };

        const url3 = {
            method: 'POST',
            url: '/users',
            payload: {
                username: 'jessica',
                password: 'hello',
                firstName: 'Jessica',
                lastName: 'Rabbit',
                email: 'roger@acme.com',
                imageURL: 'https://www.jarrodyellets.com/images/penPro.jpg',
                location: 'Toon Town',
                bio: 'Actor'
            }
        };


        const res1 = await Server.inject(url1);
        const res2 = await Server.inject(url2);
        const res3 = await Server.inject(url3);

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
        expect(res2.result).to.equal({ error: 'Username already exists' });
        expect(res3.result).to.equal({ error: 'Email already exists' });


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

        const res = await Server.inject(url);

        expect(res.result).to.equal({
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

        const user = { id: '12345' };

        const url = {
            method: 'GET',
            url: '/users',
            credentials: user
        };

        const res = await Server.inject(url);

        await expect(res.result).to.part.include([{ userName: 'roger' }]);

    });

    it('Gets specific user', async () => {

        const Server = await server(true);

        const user = { id: '12345' };

        const url1 = {
            method: 'GET',
            url: '/users/roger',
            credentials: user
        };

        const url2 = {
            method: 'GET',
            url: '/users/jarrod',
            credentials: user
        };

        const res1 = await Server.inject(url1);
        const res2 = await Server.inject(url2);

        await expect(res1.result).to.include({ userName: 'roger' });
        await expect(res2.result).to.equal({ error: 'No results' });

    });

    it('Updates user', async (flags) => {

        const Server = await server(true);

        const user = { id: '12345' };

        const url = {
            method: 'PUT',
            url: '/users/roger',
            credentials: user,
            payload: {
                firstName: 'Roger',
                lastName: 'Rabbit',
                email: 'roger@toontown.com',
                imageURL: 'https://vignette.wikia.nocookie.net/disney/images/b/b6/Rogerpoint.png/revision/latest?cb=20131219044547',
                location: 'Toon Town',
                bio: 'Actor'
            }
        };

        const res = await Server.inject(url);

        expect(res.result).to.part.include([{
            userName: 'roger',
            firstName: 'Roger',
            lastName: 'Rabbit',
            email: 'roger@toontown.com',
            imageURL: 'https://vignette.wikia.nocookie.net/disney/images/b/b6/Rogerpoint.png/revision/latest?cb=20131219044547',
            location: 'Toon Town',
            bio: 'Actor'
        }]);
    });
});




