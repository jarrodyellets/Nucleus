import { SIGN_UP, ERROR } from './types';

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
        console.log(user);
        if(!user.error){
          dispatch({
            type: SIGN_UP,
            payload: user
          });
          resolve();
        } else {
          dispatch({
            type: ERROR,
            payload: user
          });
          resolve();
        }
    });
  });
}