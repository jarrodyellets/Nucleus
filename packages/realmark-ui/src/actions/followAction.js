import { FOLLOW } from './types';

export const follow = (id) => dispatch => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/users/following/' + id, {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(id)
      })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: FOLLOW,
          payload: data  
        })
        resolve();
      })
    })
}