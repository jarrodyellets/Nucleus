import { LOG_IN } from './types';

export const checkLogin = () => dispatch => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/checklogin', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if(data.login){
                dispatch({
                    type: LOG_IN,
                    payload: data
                })
            }
            resolve();
        })
    })
  }