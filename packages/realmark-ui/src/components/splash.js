import React from 'react'
import LogIn from './logIn';

const Splash = (props) => {
  return (
    <div className="splashWrapper">
      <div className="splashInnerWrapper">
        <div className="splashLeft">
          <LogIn member={props.member} />
        </div>
        <div className="splashRight">
          <div className="splashTitle">BlogHub <img className="splashLogo" alt="logo" src="https://www.jarrodyellets.com/images/BlogHubLogo.png"/></div>
          <div className="splashDescription">
            <div>Share Your Thoughts.</div>
            <div className="splashDescriptionLine">Find Your Friends.</div>
            <div>Watch the World Happen Live.</div>
          </div>
          <div className="splashButtonWrapper">
            <button className="splashButton btn" onClick={() => {props.changeMember(true)}}>Login</button>
            <button className="splashButton btn" onClick={() => {props.changeMember(false)}}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Splash