import { FOLLOW } from './types';

export const unfollow = (id) => dispatch => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/users/following/' + id, {
      method: 'DELETE',
      headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(id)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch({
          type: FOLLOW,
          payload: data  
        })
        resolve();
      })
    })
}