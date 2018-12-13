import { SIGN_UP, ERROR, LOG_IN } from '../actions/types';

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
        newUser: true
      };
      case LOG_IN:
        return {
          ...state,
          id: action.payload.id,
          login: action.payload.login,
          loginError: action.payload.error
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