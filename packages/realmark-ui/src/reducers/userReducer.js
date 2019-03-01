import { SIGN_UP, UPDATE_USER, USERERROR, LOG_IN, LOG_OUT, POST, MEMBER, FOLLOW, LIKE, MESSAGE, DELETE_MESSAGE } from '../actions/types';

const initialState ={
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  bio: '',
  imageURL: '',
  location: '',
  posts: [],
  followers: [],
  following: [],
  timeline: [],
  mail: {
    sent: [],
    received: []
  },
  id: '',
  login: false,
  loginError: '',
  member: true,
  error: {
    isUserNameEmpty: false,
    isFirstNameEmpty: false,
    isLastNameEmpty: false,
    isNotEmail: false,
    isEmailEmpty: false,
    isPasswordEmpty: false
  }
}

export default function(state = initialState, action){
  switch (action.type){
    case SIGN_UP:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        username: action.payload.userName,
        imageURL: action.payload.imageURL,
        location: action.payload.location,
        bio: action.payload.bio,
        id: action.payload.id,
        login: true,
        test: true,
        newUser: true
      };
      case LOG_IN:
        return {
          ...state,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          username: action.payload.userName,
          imageURL: action.payload.imageURL,
          location: action.payload.location,
          bio: action.payload.bio,
          id: action.payload.id,
          login: action.payload.login,
          loginError: action.payload.error,
          posts: action.payload.posts,
          followers: action.payload.followers,
          following: action.payload.following,
          timeline: action.payload.timeline,
          mail: action.payload.mail
        };
      case POST:
        return {
          ...state,
          posts: action.payload.posts,
          timeline: action.payload.timeline
        };
      case LOG_OUT:
        return {
          ...state,
          login: action.payload,
          member: true,
          error: {
            isUserNameEmpty: false,
            isFirstNameEmpty: false,
            isLastNameEmpty: false,
            isNotEmail: false,
            isEmailEmpty: false,
            isPasswordEmpty: false
          }
        };
      case MEMBER:
        return {
          ...state,
          member: action.payload,
          error: {
            isUserNameEmpty: false,
            isFirstNameEmpty: false,
            isLastNameEmpty: false,
            isNotEmail: false,
            isEmailEmpty: false,
            isPasswordEmpty: false
          }
        };
      case FOLLOW:
        return {
          ...state,
          following: action.payload.following,
          timeline: action.payload.timeline
        };
      case LIKE:
        return {
          ...state,
          timeline: action.payload.timeline,
          posts: action.payload.signedPosts
        };
      case USERERROR:
        return {
          ...state,
          error: action.payload.error
      };
      case MESSAGE:
        return {
          ...state,
          mail: action.payload.author.mail
        };
      case DELETE_MESSAGE:
        return {
          ...state,
          mail: action.payload.mail
        }
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
      default :
        return state;
  }
}
