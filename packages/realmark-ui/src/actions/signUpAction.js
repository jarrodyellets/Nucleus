import { SIGN_UP } from './types';

export const signUpUser = (data) => dispatch => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/users', {
      method:'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(user => {
        dispatch({
        type: SIGN_UP,
        payload: user
      });
      resolve();
    });
  });
}