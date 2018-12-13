import { LOG_IN } from './types';

export const logIn = (user) => dispatch => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {console.log(data)})
  })
}