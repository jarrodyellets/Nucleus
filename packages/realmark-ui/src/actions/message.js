import { MESSAGE } from './types'

export const sendMail = (message, userID) => dispatch => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/users/' + userID + '/mail', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(message)
    })
    .then(res => res.json())
    .then(data => {
        dispatch({
          type: MESSAGE,
          payload: data
        })
        resolve();
      })
    })
  }