import React from 'react'
import SignIn from './signIn';
import LogIn from './logIn';

const Splash = (props) => {
  return (
    <div class="splashWrapper">
      <div class="splashTitle">BlogHub</div>
      <div class="splashDescription">Watch the World Happen Live.</div>
      {props.member ? <LogIn /> : <SignIn />}
    </div>
  )
}

export default Splash