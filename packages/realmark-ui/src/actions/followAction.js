import { FOLLOW, GET_FOLLOWING, GET_FOLLOWERS } from './types';

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

export const getFollowing = (id) => dispatch => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/users/following/' + id, {
      method: 'GET',
      headers: {
          'content-type': 'application/json'
        },
        credentials: 'include'
      })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: GET_FOLLOWING,
          payload: data  
        })
        resolve();
      })
    })
}

export const getFollowers = (id) => dispatch => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/users/followers/' + id, {
      method: 'GET',
      headers: {
          'content-type': 'application/json'
        },
        credentials: 'include'
      })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: GET_FOLLOWERS,
          payload: data  
        })
        resolve();
      })
    })
}

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
        dispatch({
          type: FOLLOW,
          payload: data  
        })
        resolve();
      })
    })
}