import { SIGN_UP } from './types';

export const changeMember = (data) => dispatch => {
  fetch('http://localhost:8000/users', {
    method:'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  }
}