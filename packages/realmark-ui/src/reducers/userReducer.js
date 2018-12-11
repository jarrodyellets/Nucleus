import { SIGN_UP } from '../actions/types';

const initialState ={
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  posts: [],
  friends: []
}

export default function(state = initialState, action){
  switch (action.type){
    case SIGN_UP:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        username: action.payload.userName
      };
      default :
        return state;
  }
}