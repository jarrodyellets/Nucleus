'use strict';

const internals = {};

exports.get = {
  handler: async(request, h) => {
    return h.redirect('/')
  },
  auth: false
}