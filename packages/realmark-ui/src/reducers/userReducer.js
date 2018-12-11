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
  console.log(action.payload)
  switch (action.type){
    case SIGN_UP:
      return {
        ...state
      };
      default :
        return state;
  }
}