import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogIn from './logIn';
import SignUp from './signUp';

class Splash extends Component {

  render(){
    return (
      <div className="splashWrapper">
        <div className="loginWrapper">
          <div className="loginHeader">
            <div className="loginLogo">
              <div className="loginLogoTitle"><img className="splashLogo" alt="logo" src="https://www.jarrodyellets.com/images/BlogHubLogo.png"/>Nucleus</div>
              <div className="loginLogoDescription">Watch the World Happen Live.</div>
            </div>
            <div className="loginTitle">{this.props.member ? "Login:" : "Sign Up:"}</div>
          </div>
          <div className="loginFormWrapper">
            {this.props.member ? <LogIn handleMember={this.props.handleMember} /> : <SignUp handleMember={this.props.handleMember} />}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  member: state.member.member
})

export default connect(mapStateToProps)(Splash);