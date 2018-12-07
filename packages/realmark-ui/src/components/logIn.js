import React from 'react'
import { Link } from 'react-router-dom';

const LogIn = (props) => {
  return (
        <div className="loginForm">
          <label className="loginFormLabel">Username:</label>
          <input className="loginInput" type="text" name="username" placeholder="Enter username" />
          <label className="loginFormLabel">Password:</label>
          <input className="loginInput" type="password" name="password" placeholder="Enter password"/>
          <Link to='/home'><button className="loginButton btn" type="submit">Login</button></Link>
          <div className="loginFirstTime">First Time Here?</div>
          <button className="loginButton btn" onClick={() => {props.changeMember(false)}}>Register</button>
        </div>
  )
}

export default LogIn;