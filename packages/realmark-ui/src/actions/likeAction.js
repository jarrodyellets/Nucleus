import { LIKE } from './types';

export const addLike = (userID, postID, path) => dispatch => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/users/' + userID + '/posts/' + postID + '/likes', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({path})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
        dispatch({
          type: LIKE,
          payload: data
        })
        resolve();
      })
    })
  }


  export const disLike = (userID, postID, path) => dispatch => {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:8000/users/' + userID + '/posts/' + postID + '/likes', {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({path})
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