'use strict';

const Db = require('@realmark/db');
const Hapi = require('hapi');
const Joi = require('joi');
const Path = require('path');
const Bcrypt = require('bcrypt');
const _ = require('underscore');
let client;


//Deaclare internals

const internals = {
  schema: {
    userName: Joi.string().min(1).required(),
    password: Joi.string().min(1).required(),
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    posts: Joi.string().min(1).max(100),
    comments: Joi.string().min(1),
    friends: Joi.string(),
    imageURL: Joi.string(),
    location: Joi.string()
  }
}


//Database server

const database = async () => {

  const server = await Db.server();

  await server.start();

  client = new Db.Client({
    location: server.info.uri,
    database: 'blog'
  });

  await client.create();

  const create = ({
    id: {
      type: 'uuid'
    }
  });

  await client.table('users', {
    create
  });

  await init();
}


//API server

const server = Hapi.server({
  port: 8000,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, '..', '..', 'realmark-ui', 'build')
    },
    response: {
      emptyStatusCode: 204
    },
    cors: true,
  }
});


//Auth Strategy

// const validate = async (request, username, password, h) => {

//   const userArray = await client.users.query({
//     userName: username
//   });

//   const user = userArray[0];

//   if (!user) {
//     return { credentials: null, isValid: false };
//   }

//   const isValid = await Bcrypt.compare(password, user.password);
//   const credentials = { id: user.id, name: user.firstName };

//   return { isValid, credentials };
// }

const init = async () => {

  await server.register(require('hapi-auth-basic'));
  await server.register(require('hapi-auth-cookie'));
  await server.register([{
    plugin: require('inert')
  }])


  server.auth.strategy('session', 'cookie', { 
    password: 'RDXcdNWW6649jd9TKsQNsbSwfzNHrBBa',
    cookie: 'session',
    isSecure: false,
    redirectTo: '/'

  });

   server.auth.default('session');

   //Validation error handling

   server.ext('onPreResponse', function(request, h){
     const response = request.response;
     if(!response.isBoom){
       return h.continue;
     }
     if (request.route.method == 'post' && request.route.path == '/users'){
      const isUserNameEmpty = _.where(response.details, {message: '"username" is not allowed to be empty'}).length > 0;
      const isFirstNameEmpty = _.where(response.details, {message: '"firstName" is not allowed to be empty'}).length > 0;
      const isLastNameEmpty = _.where(response.details, {message: '"lastName" is not allowed to be empty'}).length > 0;
      const isNotEmail = _.where(response.details, {message: '"email" must be a valid email'}).length > 0;
      const isEmailEmpty = _.where(response.details, {message: '"email" is not allowed to be empty'}).length > 0;
      const isPasswordEmpty = _.where(response.details, {message: '"password" is not allowed to be empty'}).length > 0;
      return {error: {
        isUserNameEmpty,
        isFirstNameEmpty,
        isLastNameEmpty,
        isNotEmail,
        isEmailEmpty,
        isPasswordEmpty
      }}
     }
     return h.continue;
   })

   server.route({
     method: 'GET',
     path: '/',
     handler: (request, h) => {
       return h.file('index.html');
     },
     options: {
       auth: false
     }
   })

   server.route({
     method: 'GET',
     path: '/static/{path*}',
     handler: {
       directory: {
         path: './static'
       }
     },
     options: {
       auth: false
     }
   })

   server.route({
    method: 'GET',
    path: '/manifest.json',
    handler: (request, h) => {
      return h.file('manifest.json');
    },
    options: {
      auth: false
    }
  })

   server.route({
     method: 'GET',
     path: '/test',
     handler: async (request, h) => {
       
       return "HERE!";
     }
   })


   //Login
   server.route({
     method: 'POST',
     path: '/login',
     handler: async (request, h) => {
      let { username, password } = request.payload;
      let user = await client.users.query({userName: username});
      
      if(user.length < 1){
        return {login: false, error: "Invalid Username", id: null};
      } else if (!await Bcrypt.compare(password, user[0].password)){
        return {login: false, error: "Invalid Password", id: null}
      }
      request.cookieAuth.set({ id: user[0].id })
      return {
        userName: user[0].userName,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
        imageURL: user[0].imageURL,
        location: user[0].location,
        posts: user[0].posts,
        friends: user[0].friends,
        id: request.auth.artifacts.id,
        login: true,
        loginError: null
      } 

    },
     options: {
       auth: false
     }
   });

   server.route({
    method: 'GET',
    path: '/logout',
    handler: async (request, h) => {
      request.cookieAuth.clear();
      return {
        login: false
      }
    },
  })

  server.route({
    method: 'GET',
    path: '/checklogin',
    handler: async (request, h) => {
        if(request.auth.isAuthenticated){
          const user = await client.users.query({id: request.auth.credentials.id})
          return {
            userName: user[0].userName,
            firstName: user[0].firstName,
            lastName: user[0].lastName,
            email: user[0].email,
            imageURL: user[0].imageURL,
            location: user[0].location,
            posts: user[0].posts,
            friends: user[0].friends,
            id: request.auth.artifacts.id,
            login: true,
            loginError: null
          }
        }
        return {
          login: false
      }
    },
    options: {
      auth: {
        mode: 'try'
      }
    }
  })


  //Get all users
  server.route({
    method: 'GET',
    path: '/users',
    handler: async (request, h) => {
      const users = await client.users.query(); 
      return users;
    },
  })

  
  //Get specific user
  server.route({
    method: 'GET',
    path: '/users/{userId}',
    handler: async (request, h) => {
      const id = request.params.userId;
      const user = await client.users.query({id});
      return {
        userName: user[0].userName,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
        imageURL: user[0].imageURL,
        location: user[0].location,
        posts: user[0].posts,
        friends: user[0].friends,
        id: request.auth.artifacts.id,
        login: true,
        loginError: null
      };
    }
  })

  //Create user
  server.route({
    method: 'POST',
    path: '/users',
    handler: async (request, h) => {
      const userArray = await client.users.query({
        userName: request.payload.username
      });
      const emailArray = await client.users.query({
        email: request.payload.email
      })
      if (!userArray.length && !emailArray.length) {
        Bcrypt.hash(request.payload.password, 10, function (err, hash) {
          if (err) {
            console.log(err);
          } else {
            client.users.insert({
              userName: request.payload.username,
              password: hash,
              firstName: request.payload.firstName,
              lastName: request.payload.lastName,
              email: request.payload.email,
              imageURL: request.payload.imageURL,
              location: request.payload.location,
              posts: [],
              friends: []
            });
          }
        })
        return {
          userName: request.payload.username,
          firstName: request.payload.firstName,
          lastName: request.payload.lastName,
          email: request.payload.email,
          imageURL: request.payload.imageURL,
          location: request.payload.location,
          posts: [],
          friends: [],
          newUser: true
        };
      } else if(userArray.length){
        return {error: "Username already exists"};
      } else {
        return {error: "Email already exists"};
      }
    },
    options: {
      auth: false,
      validate: {
        payload: {
          username: internals.schema.userName,
          password: internals.schema.password,
          firstName: internals.schema.firstName,
          lastName: internals.schema.lastName,
          email: internals.schema.email,
          imageURL: internals.schema.imageURL,
          location: internals.schema.location
        },
        failAction: (request, h, err) => {
          throw err;
        }
      }
    }
  })


  //Update user
  server.route({
    method: 'PUT',
    path: '/users/{id}',
    handler: async (request, h) => {
      const emailArray = await client.users.query({
        email: request.payload.email
      });
      if(!emailArray.length){
        await client.users.update({
          id: request.auth.credentials.id,
          firstName: request.payload.firstName,
          lastName: request.payload.lastName,
          email: request.payload.email
        })
        const updatedUser = await client.users.query({id: request.auth.credentials.id});
        return updatedUser;
      } else {
        return "Email already exists";
      }
    },
    options: {
      validate: {
        payload: {
          firstName: internals.schema.firstName,
          lastName: internals.schema.lastName,
          email: internals.schema.email,
        }
      }
    }
  })


  //Delete user
  server.route({
    method: 'DELETE',
    path: '/users/{id}',
    handler: async (request, h) => {
      const userName = request.auth.credentials.name;
      await client.users.remove(request.params.id);
      return "User: " + userName + " deleted.";
    }
  })


  //Get blog post
  server.route({
    method: 'GET',
    path: '/users/{userId}/posts/{postId}',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.auth.credentials.id});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      return post;
    }
  })


  //Add blog post
  server.route({
    method: 'POST',
    path: '/users/posts',
    handler: async (request, h) => {
      const id = request.auth.artifacts.id;
      let user = await client.users.query({id: id});
      const posts = await user[0].posts;
      const date = Date.now();
      const newPost  = {
        date,
        comments: [],
        likes: [],
        post: request.payload.post,
        id: id + date
      }
      await posts.unshift(newPost);
      await client.users.update({id: id, posts});
      user = await client.users.query({id})
      return {
        posts: user[0].posts
      }
    },
    options: {
      validate: {
        payload: {
          post: internals.schema.posts
        }
      }
    }
  })


  //Update blog post
  server.route({
    method: 'PUT',
    path: '/users/{userId}/posts/{postId}',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.auth.credentials.id});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id)
      posts[postIndex].post = request.payload.post; 
      await client.users.update({id: request.auth.credentials.id, posts});
      return 'Post updated';
    },
    options: {
      validate: {
        payload: {
          post: internals.schema.posts
        }
      }
    }
  })


  //Delete blog post
  server.route({
    method: 'DELETE',
    path: '/users/{userId}/posts/{postId}',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.auth.credentials.id});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id);
      await posts.splice(postIndex, 1);
      await client.users.update({id: request.auth.credentials.id, posts});
      return 'Post deleted';
    }
  })


  //Get all comments
  server.route({
    method: 'GET',
    path: '/users/{userId}/posts/{postId}/comments',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      return post.comments;
    }
  })


  //Get comment
  server.route({
    method: 'GET',
    path:'/users/{userId}/posts/{postId}/comments/{commentId}',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const comment = await post.comments.find(comment => comment.id == request.params.commentId);
      return comment;
    }
  })


  //Add comment
  server.route({
    method: 'POST',
    path: '/users/{userId}/posts/{postId}/comments',
    handler: async (request, h) => {
      const author = request.auth.credentials.id;
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const date = Date.now();
      const post = await posts.findIndex(post => post.id == request.params.postId);
      await posts[post].comments.push({
        date,
        author: author,
        comment: request.payload.comment,
        id: author + date
      });
      await client.users.update({id: request.params.userId, posts});
      return 'Comment Added';
    },
    options: {
      validate: {
        payload: {
          comment: internals.schema.comments
        }
      }
    }
  })


  //Update comment
  server.route({
    method: 'PUT',
    path: '/users/{userId}/posts/{postId}/comments/{commentId}',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id);
      const comment = await post.comments.findIndex(comment => comment.id == request.params.commentId);
      posts[postIndex].comments[comment].comment = request.payload.comment;
      await client.users.update({id: request.auth.credentials.id, posts});
      return 'Comment updated';
    },
    options: {
      validate: {
        payload: {
          comment: internals.schema.comments
        }
      }
    }
  })


  //Delete comment
  server.route({
    method: 'DELETE',
    path: '/users/{userId}/posts/{postId}/comments/{commentId}',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id);
      const comment = await post.comments.findIndex(comment => comment.id == request.params.commentId);
      await posts[postIndex].comments.splice(comment, 1);
      await client.users.update({id: request.auth.credentials.id, posts});
      return 'Comment deleted';
    }
  })


  //Get all likes
  server.route({
    method: 'GET',
    path: '/users/{userId}/posts/{postId}/likes',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id);
      return posts[postIndex].likes;
    }
  })


  //Get all likes
  server.route({
    method: 'GET',
    path: '/user/{userId}/post/{postId}/like',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id);
      return posts[postIndex].likes;
    }
  })


  //Add like
  server.route({
    method: 'POST',
    path: '/users/{userId}/posts/{postId}/likes',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id);
      await posts[postIndex].likes.push(request.auth.credentials.id);
      await client.users.update({id: request.params.userId, posts})
      return 'Post liked!';
    }
  })


  //Delete like
  server.route({
    method: 'DELETE',
    path: '/users/{userId}/posts/{postId}/likes',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const posts = user[0].posts;
      const post = await posts.find(post => post.id == request.params.postId);
      const postIndex = await posts.findIndex(x => x.id == post.id);
      const likeIndex = await posts[postIndex].likes.find(like => like == request.auth.credentials.id);
      await posts[postIndex].likes.splice(likeIndex, 1);
      await client.users.update({id: request.params.userId, posts});
      return 'Like deleted';
    }
  })


  //Get all friends
  server.route({
    method: 'GET',
    path: '/users/{userId}/friends',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      return user[0].friends;
    }
  })


  //Add friend
  server.route({
    method: 'POST',
    path: '/users/{userId}/friends',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const friends = user[0].friends;
      await friends.push(request.auth.credentials.id);
      await client.users.update({id: request.params.userId, friends});
      return 'Friend added';
    }
  })


  //Delete friend
  server.route({
    method: 'DELETE',
    path: '/users/{userId}/friends',
    handler: async (request, h) => {
      const user = await client.users.query({id: request.params.userId});
      const friends = user[0].friends;
      const friendIndex = await friends.find(friend => friend == request.auth.credentials.id);
      await friends.splice(friendIndex, 1);
      await client.users.update({id: request.params.userId, friends});
      return 'Friend deleted';
    }
  })


  try {
    await server.start()
    console.log('Server started on %s', server.info.uri);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

database();