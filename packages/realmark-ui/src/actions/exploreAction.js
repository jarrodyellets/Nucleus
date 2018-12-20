import { EXPLORE } from './types';

export const explore = () => dispatch => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/users', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            const sorted = data.sort(function(a, b){
                return b.posts.length - a.posts.length
              })
            dispatch({
                type: EXPLORE,
                payload: sorted
            })
            resolve();
        })
    })
  }