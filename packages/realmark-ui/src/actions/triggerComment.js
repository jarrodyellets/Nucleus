import { TRIGGER_COMMENT } from './types';

export const triggerComment = (trigger, post) => dispatch => {
  dispatch({
    type: TRIGGER_COMMENT,
    payload: {trigger, post}
  });
}