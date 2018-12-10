import { MEMBER } from '../actions/types';

const initialState ={
  member: true
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