'use strict'

const { server } = require('../../api/lib/index');

const init = async () => {
  console.log(server);
  // try {
  //   await server.start();
  //   console.log('Server start on %s', server.info.uri);
  // } catch (err) {
  //   console.log(err);
  //   process.exit(1);
  // }
}

init();