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
          <div className="splashTitle">BlogHub</div>
          <div className="splashDescription">Watch the World Happen Live.</div>
          <div className="splashButtonWrapper">
            <button className="splashButton" onClick={() => {props.changeMember(true)}}>Login</button>
            <button className="splashButton" onClick={() => {props.changeMember(false)}}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Splash