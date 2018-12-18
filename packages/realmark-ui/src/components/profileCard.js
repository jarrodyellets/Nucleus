import React, { Component } from 'react';
import { connect } from 'react-redux';


class ProfileCard extends Component {
  constructor(props){
    super(props);

  }
  
  render(){
    console.log(this.props)
    return (
      <div className="profileCardWrapper">
        <div className="profileCardInnerWrapper">
          <img className="profileCardImg" alt="Profile" src={this.props.user.imageURL ? this.props.user.imageURL : "https://www.jarrodyellets.com/images/profilePlaceholder.png"}/>
          <div className="profileCardInfoWrapper">
            <div className="profileCardFullName">{this.props.user.firstName} {this.props.user.lastName}</div>
            <div className="profileCardUserName">@{this.props.user.username}</div>
            <div className="profileCardContactWrapper">
              <div className="profileCardContact"><i className="far fa-envelope fa-icon"></i> {this.props.user.email}</div>
              <div className="profileCardLocation"><i className="fas fa-map-pin fa-icon"></i> {this.props.user.location}</div>
            </div>
            <div className="profileCardPostsWrapper">
              <div className="profileCardHeading">Posts:</div>
              <div className="profileCardHeading">Friends:</div>
              <div className="profileCardHeading">Likes:</div>
              <div className="profileCardNumbers">{this.props.user.posts.length}</div>
              <div className="profileCardNumbers">{this.props.user.friends.length}</div>
              <div className="profileCardNumbers">56</div>
            </div>
          </div>
        </div>
        <div className="searchBoxWrapper">
          <button className="searchBoxButton">Edit Profile</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

export default connect(mapStateToProps)(ProfileCard);