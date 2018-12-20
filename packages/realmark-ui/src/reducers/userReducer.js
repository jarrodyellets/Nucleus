import { SIGN_UP, ERROR, LOG_IN, LOG_OUT, POST, MEMBER } from '../actions/types';

const initialState ={
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  imageURL: '',
  location: '',
  posts: [],
  friends: [],
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
        posts: action.payload.posts,
        friends: action.payload.friends,
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
          posts: action.payload.posts
        };
      case POST:
        return {
          ...state,
          posts: action.payload.posts
        };
      case LOG_OUT:
        return {
          ...state,
          login: action.payload,
          member: true
        };
      case MEMBER:
        return {
          ...state,
          member: action.payload
        };
      case ERROR:
        return {
          ...state,
          error: action.payload.error
      };
      default :
        return state;
  }
}