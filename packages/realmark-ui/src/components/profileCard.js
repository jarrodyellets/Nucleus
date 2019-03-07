import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class ProfileCard extends Component {
  constructor(props) {
    super(props);
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
              {this.props.user.firstName} {this.props.user.lastName}
            </div>
            <div className="profileCardUserName">@{this.props.user.username}</div>
            <div className="profileCardContactWrapper">
              <div className="profileCardBio">{this.props.user.bio}</div>
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
                <Link to="/following">
                  <div className="profileCardHeading">Following:</div>
                  <div className="profileCardNumbers">{this.props.user.following.length}</div>
                </Link>
              </div>
              <div className="profileCardInnerPostsWrapper">
                <Link to="/followers">
                  <div className="profileCardHeading">Followers:</div>
                  <div className="profileCardNumbers">{this.props.user.followers.length}</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default withRouter(connect(mapStateToProps)(ProfileCard));
