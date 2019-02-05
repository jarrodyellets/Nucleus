'use strict';

const internals = {};

exports.get = {
    handler: (request, h) => {

        return h.redirect('/');
    },
    auth: false
};
