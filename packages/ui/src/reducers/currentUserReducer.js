import { SEARCH, FOLLOW, LIKE, UPDATE_USER, MESSAGE } from '../actions/types';

const initialState ={
  firstName: '',
  lastName: '',
  email: '',
  bio: '',
  username: '',
  imageURL: '',
  location: '',
  posts: [],
  followers: [],
  following: [],
  mail: {
    sent: [],
    received: []
  },
  id: '',
}

export default function(state = initialState, action){
  switch (action.type){
    case SEARCH:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        username: action.payload.userName,
        imageURL: action.payload.imageURL,
        location: action.payload.location,
        bio: action.payload.bio,
        posts: action.payload.posts,
        followers: action.payload.followers,
        following: action.payload.following,
        id: action.payload.id,
        mail: action.payload.mail
      };
      case UPDATE_USER:
        return {
          ...state,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          bio: action.payload.bio,
          username: action.payload.userName,
          imageURL: action.payload.imageURL,
          location: action.payload.location,
        }
    case FOLLOW:
      return {
        ...state,
        followers: action.payload.followers
      };
    case LIKE:
      return {
        ...state,
        posts: action.payload.posts
      }
    case MESSAGE:
      return {
        ...state,
        mail: action.payload.recipient.mail
      }
      default :
        return state;
  }
}