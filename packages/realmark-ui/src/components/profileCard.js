import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchUser } from '../actions/searchAction';

class ProfileCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: ''
    }

    this.onChange = this.onChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

  }

  onChange(e){
    this.setState({
      username: e.target.value
    })
  }

  handleSearch(){
    this.props.searchUser(this.state.username)
    .then(() => {
      console.log(this.props.currentUser);
    })
  }

  render(){
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
          <div className="searchBoxInputWrapper">
            <input className="searchBoxInput" name="search" onChange={this.onChange} value={this.state.username} placeholder="Search Nucleus" />
            <i className="fas fa-search" onClick={this.handleSearch}></i>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})

export default connect(mapStateToProps, {searchUser})(ProfileCard);