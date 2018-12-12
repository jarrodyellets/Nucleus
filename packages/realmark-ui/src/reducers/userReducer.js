import { SIGN_UP, ERROR } from '../actions/types';

const initialState ={
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  posts: [],
  friends: [],
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