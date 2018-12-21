import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExploreUser from './exploreUser';
import { searchUser } from '../actions/searchAction';


class Explore extends Component {
  constructor(props){
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(name){
    console.log(name);
    this.props.searchUser(name)
    .then(() => {
      if(this.props.currentUser.username){
        this.props.history.push('/user');
      }
    })
  }

  render(){
    const users = this.props.allUsers;
    const topPosters = users.posts.map((user) => {
      return (
        <div className="exploreMain">
          <ExploreUser userData={this.props.userData} user={user} id={user.id} handleSearch={this.handleSearch} />
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

export default connect(mapStateToProps, {searchUser})(Explore);