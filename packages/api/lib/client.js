'use strict';

const Db = require('@realmark/db');
let dbClient;

const internals = {};

const returnClient = () => {
  return dbClient;
}

const dbase = async () => {

  const server = await Db.server();

  await server.start();

  dbClient = new Db.Client({
    location: server.info.uri,
    database: 'blog'
  });

  await dbClient.create();

  const create = ({
    id: {
      type: 'uuid'
    }
  });

  await dbClient.table('users', {
    create
  });
  await returnClient()
  return dbClient;
}

module.exports = {
  dbase,
  returnClient
}
