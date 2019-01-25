import { TRIGGER_COMMENT, TRIGGER_MODAL, TRIGGER_EDIT } from './types';

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

export const triggerEdit = (edit) => dispatch => {
  dispatch({
    type: TRIGGER_EDIT,
    payload: {edit}
  });
}