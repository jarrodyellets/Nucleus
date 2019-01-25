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
            <div className="profileCardFullName">
            <input  className="loginInput" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="Enter First Name"/> {this.props.user.lastName}
            </div>
            <div className="profileCardUserName">@{this.props.user.username}</div>
            <div className="profileCardContactWrapper">
              <div className="profileCardContact">
                <i className="far fa-envelope fa-icon" /> {this.props.user.email}
              </div>
              <div className="profileCardLocation">
                <i className="fas fa-map-pin fa-icon" /> {this.props.user.location}
              </div>
            </div>
            <div className="profileCardPostsWrapper">
              <div className="profileCardInnerPostsWrapper">
                <div className="profileCardHeading">Posts:</div>
                <div className="profileCardNumbers">{this.props.user.posts.length}</div>
              </div>
              <div className="profileCardInnerPostsWrapper">
                <div className="profileCardHeading">Following:</div>
                <div className="profileCardNumbers">{this.props.user.following.length}</div>
              </div>
              <div className="profileCardInnerPostsWrapper">
                <div className="profileCardHeading">Followers:</div>
                <div className="profileCardNumbers">{this.props.user.followers.length}</div>
              </div>
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
