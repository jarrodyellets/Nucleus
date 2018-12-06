import React from 'react'
import SignIn from './signIn';
import LogIn from './logIn';

const Splash = (props) => {
  return (
    <div className="splashWrapper">
      <div className="splashLeft">
        {props.member ? <LogIn /> : <SignIn />}
      </div>
      <div className="splashRight">
        <div className="splashTitle">BlogHub</div>
        <div className="splashDescription">Watch the World Happen Live.</div>
      </div>
    </div>
  )
}

export default Splash