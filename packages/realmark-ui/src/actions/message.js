import { MESSAGE, DELETE_MESSAGE, READ_MAIL } from './types'

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

  export const readMail = (messageID, userID) => dispatch => {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:8000/users/' + userID + '/mail/' + messageID, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include'
      })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: READ_MAIL,
          payload: data
        })
        resolve();
      })
    })
  }

  export const deleteMail = (messageID, box) => dispatch => {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:8000/users/mail/' + messageID, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({box})
      })
      .then(res => res.json())
      .then(data => {
          dispatch({
            type: DELETE_MESSAGE,
            payload: data
          })
          resolve();
        })
      })
    }