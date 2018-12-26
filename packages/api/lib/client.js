'use strict';

const Db = require('@realmark/db');
let dbClient;

const internals = {};

      module.exports.dbase = async () => {

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
        global.client = dbClient;
        return dbClient;
    }
