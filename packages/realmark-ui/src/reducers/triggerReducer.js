import { TRIGGER_COMMENT, TRIGGER_MODAL } from '../actions/types';

const initialState ={
  comment: false,
  currentPost: {},
  modal: false,
  post: false,
}

export default function(state = initialState, action){
  switch (action.type){
    case TRIGGER_COMMENT:
      return {
        ...state,
        comment: action.payload.trigger,
        modal: action.payload.trigger,
        currentPost: action.payload.post
      };
    case TRIGGER_MODAL:
      return {
        ...state,
        modal: action.payload.trigger,
        currentPost: action.payload.post
      }
      default :
        return state;
  }
}