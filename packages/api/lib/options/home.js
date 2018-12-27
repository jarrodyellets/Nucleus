'use strict'

const internals = {};

exports.home = {
  handler: (request, h) => {
      return h.file('index.html');
    },
  auth: false
}

exports.css = {
  handler: {
    directory: {
      path: './static'
    }
  },
  auth: false
}

exports.manifest = {
  handler: (request, h) => {
    return h.file('manifest.json');
  },
  auth: false
}