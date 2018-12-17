import React from 'react'

const LogIn = (props) => {
  return (
        <div className="loginForm">
          <label className="loginFormLabel" id="loginUsername">Username:</label>
          <input className="loginInput" type="text" name="username" onChange={props.onChange} placeholder="Enter username" />
          <label className="loginFormLabel" id="loginPassword">Password:</label>
          <input className="loginInput" type="password" name="password" onKeyPress={props.handleKeyPress} onChange={props.onChange} placeholder="Enter password"/>
          <button className="loginButton btn" onClick={props.handleLogin}>Login</button>
          {props.error.error && <div className="loginError">{props.error.error}</div>}
          <div className="loginFirstTime">First Time Here?</div>
          <button className="loginButton btn" type="submit" onClick={() => {props.handleMember(false)}}>Register</button>
        </div>
  )
}

export default LogIn;