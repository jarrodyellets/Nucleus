import React from 'react'

const LogIn = (props) => {
  return (
    <div className="loginWrapper">
      <div className="loginHeader">
        <div className="loginTitle">Login</div>
        <div className="loginDescription">Fill in form below to login</div>
      </div>
      <div className="loginFormWrapper">
        <form className="loginForm">
          <input className="loginInput" type="text" name="username" placeholder="username" />
          <input className="loginInput" type="password" name="password" placeholder="password" />
          <button className="loginButton" type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default LogIn;