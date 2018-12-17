import { SEARCH } from './types';

export const searchUser = (user) => dispatch => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/users/' + user, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: SEARCH,
                payload: data
            })
            resolve();
        })
    })
  }