'use strict';

const Db = require('@realmark/db');

const internals = {
  client: {}
};

const dbase = async () => {
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

  return internals.client;
};

module.exports = {dbase};
