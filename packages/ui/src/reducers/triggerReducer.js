import { TRIGGER_COMMENT, TRIGGER_MODAL, TRIGGER_EDIT, TRIGGER_MESSAGE, SELECTED_POST, LIKE, READ_MESSAGE, REPLY } from '../actions/types';

const initialState ={
  comment: false,
  currentPost: {},
  modal: false,
  message: false,
  readMessage: false,
  reply: false,
  post: false,
  edit: false,
  selectedPost: ''
}

export default function(state = initialState, action){
  switch (action.type){
    case TRIGGER_COMMENT:
      return {
        ...state,
        comment: action.payload.comment,
        modal: action.payload.modal,
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
        currentPost: action.payload.currentPost
      }
    case TRIGGER_EDIT:
      return {
        ...state,
        edit: action.payload.edit
      }
    case TRIGGER_MESSAGE:
      return {
        ...state,
        message: action.payload.trigger
      }
    case READ_MESSAGE:
      return {
        ...state,
        readMessage: action.payload.trigger
      }
    case REPLY:
      return {
        ...state,
        reply: action.payload.trigger
      }
      default :
        return state;
  }
}