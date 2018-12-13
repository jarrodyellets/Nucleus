import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogIn from './logIn';
import SignUp from './signUp';
import { signUpUser } from '../actions/signUpAction';

class Splash extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      imageURL: '',
      location: ''
    }

    this.onChange = this.onChange.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleData(){
    const data = this.state;
    this.props.signUpUser(data)
    .then(() => {console.log(this.props.userData)})
  }

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
            {this.props.member ? <LogIn userData={this.props.userData} handleMember={this.props.handleMember} /> : <SignUp user={this.state} userData={this.props.userData} handleData={this.handleData} onChange={this.onChange} handleMember={this.props.handleMember} />}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  member: state.member.member,
  userData: state.user,
})

export default connect(mapStateToProps, {signUpUser})(Splash);