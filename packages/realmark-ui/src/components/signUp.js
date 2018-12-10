import React from 'react'

const SignUp = (props) => {
  return (
    <div className="loginForm">
      <label className="loginFormLabel">First Name:</label>
      <input className="loginInput" type="text" name="firstName" value={props.user.firstName} onChange={props.onChange} placeholder="Enter first name" />
      <label className="loginFormLabel">Last Name:</label>
      <input className="loginInput" type="text" name="lastName" value={props.user.lastName} onChange={props.onChange} placeholder="Enter last name" />
      <label className="loginFormLabel">Email:</label>
      <input className="loginInput" type="text" name="email" value={props.user.email} onChange={props.onChange} placeholder="Enter email" />
      <label className="loginFormLabel">Username:</label>
      <input className="loginInput" type="text" name="username" value={props.user.username} onChange={props.onChange} placeholder="Enter username" />
      <label className="loginFormLabel">Password:</label>
      <input className="loginInput" type="password" name="password" value={props.user.password} onChange={props.onChange} placeholder="Enter password"/>
      <button className="loginButton btn" type="submit" onClick={props.handleData}>Sign Up</button>
      <div className="loginFirstTime">Already a User?</div>
      <button className="loginButton btn" onClick={() => {props.handleMember(true)}}>Login</button>
    </div>
  )
}

export default SignUp;