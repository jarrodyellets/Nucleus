import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerEdit } from '../actions/triggerActions';
import { updateUser } from '../actions/userActions';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      imageURL: this.props.user.imageURL,
      location: this.props.user.location,
      bio: this.props.user.bio
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleProfile() {
    this.props.triggerEdit(false);
  }

  handleUpdate() {
    this.props.updateUser(this.state, this.props.user.username)
    .then(() => {
      this.props.triggerEdit(false);
    })
  }

  render() {
    return (
      <div className="profileCardWrapper">
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
              <label className="editFormLabel">Bio:</label>
              <textarea
                className="editTextInput"
                type="text"
                name="bio"
                value={this.state.bio}
                onChange={this.handleChange}
                placeholder="Enter bio"
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
            </div>
          </div>
        </div>
        <div className="editButtonWrapper">
                <button className="editSaveButton editProButton" onClick={() => {this.handleUpdate()}}>Save</button>
                <button className="editCancelButton editProButton" onClick={() => {this.handleProfile()}}>Cancel</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {triggerEdit, updateUser})(EditProfile);
