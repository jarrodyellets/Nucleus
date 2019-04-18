import { EXPLORE } from '../actions/types';

const initialState ={
  allUsers: []
}

export default function(state = initialState, action){
  switch (action.type){
    case EXPLORE:
      return {
        ...state,
        allUsers: action.payload
      };
      default :
        return state;
  }
}