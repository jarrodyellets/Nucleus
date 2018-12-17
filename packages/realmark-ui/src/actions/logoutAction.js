import { LOG_OUT } from './types';

export const logOut = () => dispatch => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/logout', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: LOG_OUT,
                payload: data.login
            })
            resolve();
        })
    })
  }