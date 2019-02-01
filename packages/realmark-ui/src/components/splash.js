import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogIn from './logIn';
import SignUp from './signUp';
import { signUpUser, logIn } from '../actions/userActions';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      imageURL: '',
      location: '',
      bio: ''
    };

    this.onChange = this.onChange.bind(this);
    this.handleData = this.handleData.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleData() {
    const data = this.state;
    this.props.signUpUser(data).then(() => {
      const user = this.props.userData;
      let error = Object.keys(user.error).filter(function(key) {
        return user.error[key] === true;
      });
      if (error.length === 0) {
        console.log(this.props.userData);
        this.props.history.push('/home');
      }
    });
  }

  handleLogin() {
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.logIn(user).then(() => {
      if (!this.props.error.error) {
        this.props.history.push('/home');
      }
    });
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      const user = {
        username: this.state.username,
        password: this.state.password
      };
      this.props.logIn(user).then(() => {
        if (!this.props.error.error) {
          this.props.history.push('/home');
        }
      });
    }
  }

  render() {
    return (
      <div className="splashWrapper">
        <div className="loginWrapper">
          <div className="loginHeader">
            <div className="loginLogo">
              <div className="loginLogoTitle">
                <img className="splashLogo" alt="logo" src="https://www.jarrodyellets.com/images/BlogHubLogo.png" />
                Nucleus
              </div>
              <div className="loginLogoDescription">Watch the World Happen Live.</div>
            </div>
            <div className="loginTitle">{this.props.userData.member ? 'Login:' : 'Sign Up:'}</div>
          </div>
          <div className="loginFormWrapper">
            {this.props.userData.member ? (
              <LogIn
                userData={this.props.userData}
                error={this.props.error}
                handleMember={this.props.handleMember}
                onChange={this.onChange}
                handleKeyPress={this.handleKeyPress}
                handleLogin={this.handleLogin}
              />
            ) : (
              <SignUp
                user={this.state}
                userData={this.props.userData}
                handleData={this.handleData}
                handleKeyPress={this.handleKeyPress}
                onChange={this.onChange}
                handleMember={this.props.handleMember}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.user,
  error: state.error
});

export default connect(
  mapStateToProps,
  { signUpUser, logIn }
)(Splash);
