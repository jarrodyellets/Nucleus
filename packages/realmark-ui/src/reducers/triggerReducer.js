import { TRIGGER_COMMENT } from '../actions/types';

const initialState ={
  comment: false,
  currentPost: {},
  post: false,
}

export default function(state = initialState, action){
  switch (action.type){
    case TRIGGER_COMMENT:
      return {
        ...state,
        comment: action.payload.trigger,
        currentPost: action.payload.post
      };
      default :
        return state;
  }
}