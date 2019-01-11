'use strict';

const { returnClient } = require('./client');

const internals = {}

exports.createTimeline = async (id) => {
  const client = returnClient();
  let user = await client.users.query({id});
  const timeline = [];
  for(let u of user[0].following){
    const following = await client.users.query({id: u});
    for(let post of following[0].posts){
      await timeline.push(post);
    }
  }
  for(let post of user[0].posts){
    await timeline.push(post);
  }
  await client.users.update({id, timeline})
  user = await client.users.query({id});
  return user[0].timeline
}