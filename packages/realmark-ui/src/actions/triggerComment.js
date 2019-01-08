import { TRIGGER_COMMENT } from './types';

export const triggerComment = trigger => dispatch => {
  dispatch({
    type: TRIGGER_COMMENT,
    payload: trigger
  });
}