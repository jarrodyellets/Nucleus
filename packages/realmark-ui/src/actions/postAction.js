import { POST } from './types';

export const addPost = (post) => dispatch => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/users/posts', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(post)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
        dispatch({
          type: POST,
          payload: data
        })
        resolve();
      })
    })
  }