import { TRIGGER_COMMENT, TRIGGER_MODAL, SELECTED_POST, LIKE } from '../actions/types';

const initialState ={
  comment: false,
  currentPost: {},
  modal: false,
  post: false,
  selectedPost: ''
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
    case SELECTED_POST:
      return {
        ...state,
        selectedPost: action.payload
      }
    case LIKE:
      return {
        ...state,
        currentPost: action.payload.post
      }
      default :
        return state;
  }
}