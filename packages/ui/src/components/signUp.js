import React from 'react';

const SignUp = props => {
  let error = Object.keys(props.userData.error).filter(function(key) {
    return props.userData.error[key] === true;
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
    <div className="loginForm">
      <label className="loginFormLabel">First Name:</label>
      <input
        className="loginInput"
        type="text"
        name="firstName"
        value={props.user.firstName}
        onChange={props.onChange}
        placeholder="Enter first name"
      />
      <label className="loginFormLabel">Last Name:</label>
      <input
        className="loginInput"
        type="text"
        name="lastName"
        value={props.user.lastName}
        onChange={props.onChange}
        placeholder="Enter last name"
      />
      <label className="loginFormLabel">Profile Image URL:</label>
      <input
        className="loginInput"
        type="text"
        name="imageURL"
        value={props.user.imageURL}
        onChange={props.onChange}
        placeholder="Enter image URL"
      />
      <label className="loginFormLabel">Bio:</label>
      <textarea
        className="loginTextArea"
        type="text"
        name="bio"
        value={props.user.bio}
        onChange={props.onChange}
        placeholder="Enter bio"
      />
      <label className="loginFormLabel">Location:</label>
      <input
        className="loginInput"
        type="text"
        name="location"
        value={props.user.location}
        onChange={props.onChange}
        placeholder="Enter location"
      />
      <label className="loginFormLabel">Email:</label>
      <input
        className="loginInput"
        type="text"
        name="email"
        value={props.user.email}
        onChange={props.onChange}
        placeholder="Enter email"
      />
      <label className="loginFormLabel">Username:</label>
      <input
        className="loginInput"
        type="text"
        name="username"
        value={props.user.username}
        onChange={props.onChange}
        placeholder="Enter username"
      />
      <label className="loginFormLabel">Password:</label>
      <input
        className="loginInput"
        type="password"
        name="password"
        value={props.user.password}
        onChange={props.onChange}
        placeholder="Enter password"
      />
      <div className="loginButtonWrapper">
        <button className="loginButton btn" type="submit" onClick={props.handleData}>
          Sign Up
        </button>
        {error.length > 0 && <div className="loginError">{errors[error[0]]}</div>}
      </div>
      <div className="loginFirstTime">Already a User?</div>
      <button
        className="loginButton btn"
        onClick={() => {
          props.handleMember(true);
        }}>
        Login
      </button>
    </div>
  );
};

export default SignUp;
