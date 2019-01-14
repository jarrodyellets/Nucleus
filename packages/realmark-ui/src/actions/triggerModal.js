import { TRIGGER_MODAL } from './types';

export const triggerModal = (trigger, post) => dispatch => {
  dispatch({
    type: TRIGGER_MODAL,
    payload: {trigger, post}
  });
}