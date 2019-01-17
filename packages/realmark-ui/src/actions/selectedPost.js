import { SELECTED_POST } from './types';

export const selectedPost = (post) => dispatch => {
  dispatch({
    type: SELECTED_POST,
    payload: post
  });
}