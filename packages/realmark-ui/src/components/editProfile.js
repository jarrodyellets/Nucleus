import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      username: this.props.user.userName,
      imageURL: this.props.user.imageURL,
      location: this.props.user.location
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let error = Object.keys(this.props.user.error).filter(function(key) {
      return this.props.user.error[key] === true;
    });
    const errors = {
      isUserNameEmpty: 'The username field is required!',
      isFirstNameEmpty: 'The first name field is required!',
      isLastNameEmpty: 'The last name field is required!',
      isNotEmail: 'The email field must be a valid email address!',
      isEmailEmpty: 'The email field is required!',
      isPasswordEmpty: 'The password field is required!'
    };
    return (
      <div>
        <div className="loginForm">
          <label className="loginFormLabel">First Name:</label>
          <input
            className="loginInput"
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            placeholder="Enter first name"
          />
          <label className="loginFormLabel">Last Name:</label>
          <input
            className="loginInput"
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
            placeholder="Enter last name"
          />
          <label className="loginFormLabel">Profile Image URL:</label>
          <input
            className="loginInput"
            type="text"
            name="imageURL"
            value={this.state.imageURL}
            onChange={this.handleChange}
            placeholder="Enter image URL"
          />
          <label className="loginFormLabel">Location:</label>
          <input
            className="loginInput"
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleChange}
            placeholder="Enter location"
          />
          <label className="loginFormLabel">Email:</label>
          <input
            className="loginInput"
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Enter email"
          />
          <label className="loginFormLabel">Username:</label>
          <input
            className="loginInput"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="Enter username"
          />
          <div className="loginButtonWrapper">
            <button className="loginButton btn" type="submit" onClick={props.handleData}>
              Sign Up
            </button>
            {error.length > 0 && <div className="loginError">{errors[error[0]]}</div>}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(EditProfile);
