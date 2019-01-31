import { SIGN_UP, UPDATE_USER, USERERROR, LOG_IN, ERROR, LOG_OUT, MEMBER } from './types';

export const signUpUser = data => dispatch => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(user => {
        if (!user.error) {
          dispatch({
            type: SIGN_UP,
            payload: user
          });
          resolve();
        } else {
          dispatch({
            type: USERERROR,
            payload: user
          });
          resolve();
        }
      });
  });
};

export const logIn = data => dispatch => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          dispatch({
            type: ERROR,
            payload: data.error
          });
        } else {
          dispatch({
            type: LOG_IN,
            payload: data
          });
          dispatch({
            type: ERROR,
            payload: ''
          });
        }
        resolve();
      });
  });
};

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
        });
        resolve();
      });
  });
};

export const checkLogin = () => dispatch => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/checklogin', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.login) {
          dispatch({
            type: LOG_IN,
            payload: data
          });
        }
        resolve();
      });
  });
};

export const changeMember = member => dispatch => {
  dispatch({
    type: MEMBER,
    payload: member
  });
};

export const updateUser = (data, username) => dispatch => {
  console.log(data);
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/users/' + username, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(user => {
        dispatch({
          type: UPDATE_USER,
          payload: user[0]
        });
        resolve();
      });
  });
};
