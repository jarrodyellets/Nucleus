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
    console.log(users);
    const user = users.posts.map((user) => {
      return (
        <div className="exploreMain" onClick={() => {this.handleSearch(user.userName)}}>
          <ExploreUser user={user} id={user.id} handleSeach={this.handleSeach} />
        </div>
      )
    })
    return(
      <div className="exploreWrapper">
          <div className="exploreHeader">Top Users</div>
          <div className="exploreUserWrapper">
            {user}
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allUsers: state.allUsers.allUsers,
  currentUser: state.currentUser
})

export default connect(mapStateToProps, {searchUser})(Explore);