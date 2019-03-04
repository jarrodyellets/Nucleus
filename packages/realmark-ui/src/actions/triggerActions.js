import { TRIGGER_COMMENT, TRIGGER_MODAL, TRIGGER_MESSAGE, TRIGGER_EDIT, READ_MESSAGE, REPLY } from './types';

export const triggerComment = (comment, modal, post) => dispatch => {
  dispatch({
    type: TRIGGER_COMMENT,
    payload: {comment, modal, post}
  });
}

export const triggerModal = (trigger, post) => dispatch => {
  dispatch({
    type: TRIGGER_MODAL,
    payload: {trigger, post}
  });
}

export const triggerMessage = (trigger) => dispatch => {
  dispatch({
    type: TRIGGER_MESSAGE,
    payload: {trigger}
  })
} 

export const triggerEdit = (edit) => dispatch => {
  dispatch({
    type: TRIGGER_EDIT,
    payload: {edit}
  });
}

export const readMessage = (trigger) => dispatch => {
  dispatch({
    type: READ_MESSAGE,
    payload: {trigger}
  })
}

export const reply = (trigger) => dispatch => {
  dispatch({
    type: REPLY,
    payload: {trigger}
  })
}