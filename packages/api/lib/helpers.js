'use strict';

const { returnClient } = require('./client');

const internals = {}

exports.createTimeline = async (id) => {
  console.log(internals.client);
  const client = returnClient();
  let user = await client.users.query({id});
  const timeline = [];
  await user[0].following.forEach(async user => {
    const following = await client.users.query({id: user});
    await following[0].posts.forEach(post => {
      timeline.push(post);
    });
  });
  await user[0].posts.forEach(post => {
    timeline.push(post);
  })
  await client.users.update({id, timeline})
  user = await client.users.query({id});
  return timeline
}