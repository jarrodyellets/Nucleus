import React from 'react'

const LogIn = (props) => {
  return (
    <div className="loginWrapper">
      <div className="loginHeader">
        <div className="loginLogo">
          <div className="loginLogoTitle"><img className="splashLogo" alt="logo" src="https://www.jarrodyellets.com/images/BlogHubLogo.png"/>Nucleus</div>
          <div className="loginLogoDescription">Watch the World Happen Live.</div>
        </div>
        <div className="loginTitle">Login:</div>
      </div>
      <div className="loginFormWrapper">
        <div className="loginForm">
          <label className="loginFormLabel">Username:</label>
          <input className="loginInput" type="text" name="username" placeholder="Enter username" />
          <label className="loginFormLabel">Password:</label>
          <input className="loginInput" type="password" name="password" placeholder="Enter password"/>
          <button className="loginButton btn" type="submit">Login</button>
          <div className="loginFirstTime">First Time Here?</div>
          <button className="loginButton btn">Register</button>
        </div>
      </div>

    </div>
  )
}

export default LogIn;