import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      username: this.props.user.username,
      imageURL: this.props.user.imageURL,
      location: this.props.user.location
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <div className="profileCardInnerWrapper">
          <img
            className="profileCardImg"
            alt="Profile"
            src={
              this.props.user.imageURL
                ? this.props.user.imageURL
                : 'https://www.jarrodyellets.com/images/profilePlaceholder.png'
            }
          />
          <div className="profileCardInfoWrapper">
            <div className="editForm">
              <label className="editFormLabel">First Name:</label>
              <input
                className="editInput"
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
                placeholder="Enter first name"
              />
              <label className="editFormLabel">Last Name:</label>
              <input
                className="editInput"
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
                placeholder="Enter last name"
              />
              <label className="editFormLabel">Profile Image URL:</label>
              <input
                className="editInput"
                type="text"
                name="imageURL"
                value={this.state.imageURL}
                onChange={this.handleChange}
                placeholder="Enter image URL"
              />
              <label className="editFormLabel">Location:</label>
              <input
                className="editInput"
                type="text"
                name="location"
                value={this.state.location}
                onChange={this.handleChange}
                placeholder="Enter location"
              />
              <label className="editFormLabel">Email:</label>
              <input
                className="editInput"
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Enter email"
              />
              <label className="editFormLabel">Username:</label>
              <input
                className="editInput"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                placeholder="Enter username"
              />
            </div>
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
