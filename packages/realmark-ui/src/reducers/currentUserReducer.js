import { SEARCH, FOLLOW } from '../actions/types';

const initialState ={
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  imageURL: '',
  location: '',
  posts: [],
  followers: [],
  following: [],
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
        posts: action.payload.posts,
        followers: action.payload.followers,
        following: action.payload.following,
        id: action.payload.id,
      };
    case FOLLOW:
      return {
        ...state,
        followers: action.payload.followers
      }
      default :
        return state;
  }
}