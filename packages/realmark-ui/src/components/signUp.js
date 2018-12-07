import React from 'react'

const SignUp = (props) => {
  return (
    <div className="loginForm">
      <label className="loginFormLabel">First Name:</label>
      <input className="loginInput" type="text" name="firstname" placeholder="Enter first name" />
      <label className="loginFormLabel">Last Name:</label>
      <input className="loginInput" type="text" name="lastname" placeholder="Enter last name" />
      <label className="loginFormLabel">Email:</label>
      <input className="loginInput" type="text" name="email" placeholder="Enter email" />
      <label className="loginFormLabel">Username:</label>
      <input className="loginInput" type="text" name="username" placeholder="Enter username" />
      <label className="loginFormLabel">Password:</label>
      <input className="loginInput" type="password" name="password" placeholder="Enter password"/>
      <button className="loginButton btn" type="submit">Sign Up</button>
      <div className="loginFirstTime">Already a User?</div>
      <button className="loginButton btn" onClick={() => {props.changeMember(true)}}>Login</button>
    </div>
  )
}

export default SignUp;