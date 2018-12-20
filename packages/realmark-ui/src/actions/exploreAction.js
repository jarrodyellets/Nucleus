import { EXPLORE } from './types';

export const explore = () => dispatch => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/users', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: EXPLORE,
                payload: data
            })
            resolve();
        })
    })
  }