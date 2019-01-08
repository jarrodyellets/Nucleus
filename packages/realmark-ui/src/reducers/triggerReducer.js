import { TRIGGER_COMMENT } from '../actions/types';

const initialState ={
  comment: false,
  post: false,
}

export default function(state = initialState, action){
  switch (action.type){
    case TRIGGER_COMMENT:
      return {
        ...state,
        comment: action.payload
      };
      default :
        return state;
  }
}