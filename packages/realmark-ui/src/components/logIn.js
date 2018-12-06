import React from 'react'

const LogIn = (props) => {
  return (
    <div className="loginWrapper">
      <div className="loginHeader">
        <div className="loginTitle">{props.member ? "Login" : "Sign Up"}</div>
        <div className="loginDescription">Fill in form below to {props.member ? "login" : "sign up"}</div>
      </div>
      <div className="loginFormWrapper">
        <form className="loginForm">
          <input className="loginInput" type="text" name="username" placeholder="username" />
          <input className="loginInput" type="password" name="password" placeholder="password"/>
          <button className="loginButton btn" type="submit">{props.member ? "Login" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  )
}

export default LogIn;