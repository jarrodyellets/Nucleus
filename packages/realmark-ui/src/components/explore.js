import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExploreUser from './exploreUser';
import { searchUser } from '../actions/searchAction';
import { follow } from '../actions/followAction';


class Explore extends Component {
  constructor(props){
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
  }

  handleSearch(name){
    this.props.searchUser(name)
    .then(() => {
      if(this.props.currentUser.username){
        this.props.history.push('/user');
      }
    })
  }

  handleFollow(id){
    this.props.follow(id)
    .then(() => {
      console.log(this.props.userData)
    })
  }

  render(){
    const users = this.props.allUsers;
    const topPosters = users.posts.map((user) => {
      return (
        <div className="exploreMain">
          <ExploreUser userData={this.props.userData} user={user} id={user.id} handleSearch={this.handleSearch} handleFollow={this.handleFollow}/>
        </div>
      )
    })
    const topFollowing = users.followers.map((user) => {
      return (
        <div className="exploreMain">
          <ExploreUser userData={this.props.userData} user={user} id={user.id} handleSearch={this.handleSearch} />
        </div>
      )
    })
    return(
      <div className="exploreWrapper">
          <div className="exploreHeader">Top Users</div>
          <div className="exploreUserWrapper">
            {topPosters}
          </div>
          <div className="exploreHeader">Most Followed</div>
          <div className="exploreUserWrapper">
            {topFollowing}
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allUsers: state.allUsers.allUsers,
  currentUser: state.currentUser,
  userData: state.user
})

export default connect(mapStateToProps, {searchUser, follow})(Explore);