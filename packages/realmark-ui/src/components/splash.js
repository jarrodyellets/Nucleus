import React from 'react';
import LogIn from './logIn';
import SignUp from './signUp';

const Splash = (props) => {
  return (
    <div className="splashWrapper">
      <div className="loginWrapper">
        <div className="loginHeader">
          <div className="loginLogo">
            <div className="loginLogoTitle"><img className="splashLogo" alt="logo" src="https://www.jarrodyellets.com/images/BlogHubLogo.png"/>Nucleus</div>
            <div className="loginLogoDescription">Watch the World Happen Live.</div>
          </div>
          <div className="loginTitle">{props.member ? "Login:" : "Sign Up:"}</div>
        </div>
        <div className="loginFormWrapper">
          {props.member ? <LogIn changeMember={props.changeMember} /> : <SignUp changeMember={props.changeMember} />}
        </div>
      </div>
    </div>
  )
}

export default Splash