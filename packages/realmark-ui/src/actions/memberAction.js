import { MEMBER } from './types';

export const changeMember = member => dispatch => {
  console.log(member);
  dispatch({
    type: MEMBER,
    payload: member
  });
}