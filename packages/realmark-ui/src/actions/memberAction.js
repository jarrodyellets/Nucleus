import { MEMBER } from './types';

export const changeMember = member => dispatch => {
  dispatch({
    type: MEMBER,
    payload: member
  });
}