import { SIGN_UP } from '../actions/types';

const initialState ={
  firstName: '',
  lastName: '',
  email: '',
  usename: '',
  password: ''
}

export default function(state = initialState, action){
  switch (action.type){
    case MEMBER:
      return {
        ...state,
        member: action.payload
      };
      default :
        return state;
  }
}