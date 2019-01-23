import { TRIGGER_COMMENT } from './types';

export const triggerComment = (comment, modal, post) => dispatch => {
  dispatch({
    type: TRIGGER_COMMENT,
    payload: {comment, modal, post}
  });
}