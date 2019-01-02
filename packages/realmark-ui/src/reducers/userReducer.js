import { SIGN_UP, ERROR, LOG_IN, LOG_OUT, POST, MEMBER, FOLLOW } from '../actions/types';

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
  timeline: [],
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
          id: action.payload.id,
          login: action.payload.login,
          loginError: action.payload.error,
          posts: action.payload.posts,
          followers: action.payload.followers,
          following: action.payload.following,
          timeline: action.payload.timeline
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
          member: action.payload
        };
      case FOLLOW:
        return {
          ...state,
          following: action.payload.following
        }
      case ERROR:
        return {
          ...state,
          error: action.payload.error
      };
      default :
        return state;
  }
}