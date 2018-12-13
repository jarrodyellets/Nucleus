import { LOG_IN } from './types';
import { ERROR } from './types';

export const logIn = (data) => dispatch => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        dispatch({
          type: LOG_IN,
          payload: data
        })
        resolve();
      })
    })
  }