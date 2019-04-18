import { EXPLORE } from './types';

export const explore = () => dispatch => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/users', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            const sortedPosts = data.slice(0, 6).sort(function(a, b){
                return b.posts.length - a.posts.length
              })

            const sortedFollowers = data.slice(0, 6).sort(function(a, b){
                return b.followers.length - a.followers.length
            })
            dispatch({
                type: EXPLORE,
                payload: {posts: sortedPosts, followers: sortedFollowers}
            })
            resolve();
        })
    })
  }