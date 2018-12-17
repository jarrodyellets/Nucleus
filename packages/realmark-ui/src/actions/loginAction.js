import { LOG_IN, ERROR } from './types';

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
      if(data.error){
        dispatch({
          type: ERROR,
          payload: data.error
        })
      } else {
        dispatch({
          type: LOG_IN,
          payload: data
        })
        dispatch({
          type: ERROR,
          payload: ""
        })
      }
        resolve();
      })
    })
  }