import { LIKE } from './types';

export const addComment = (id, postID, comment, path) => dispatch => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/users/' + id + '/posts/' + postID + '/comments', {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({comment, path})
      })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: LIKE,
          payload: data  
        })
        resolve();
      })
    })
}