import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExploreUser from './exploreUser';
import { follow, unfollow, getFollowing } from '../actions/followAction';

class Following extends Component {
  constructor(props) {
    super(props);
    this.state = {
        following: []
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnFollow = this.handleUnFollow.bind(this);
  }

  componentWillMount() {
      this.props.getFollowing(this.props.userData.id)
      .then(() => {
          this.setState({
              following: this.props.userData.followingArray
          })
      })
  }

  handleSearch(name) {
    this.props.searchUser(name).then(() => {
      if (this.props.currentUser.username) {
        this.props.history.push('/user');
      }
    });
  }

  handleFollow(id) {
    this.props.follow(id).then(() => {
      this.props.history.push('/home');
    });
  }

  handleUnFollow(id) {
    this.props.unfollow(id).then(() => {
      this.props.history.push('/home');
    });
  }

  render() {
      console.log(this.state.following);
    const following = this.state.following.map(user => {
      return (
        <div className="exploreMain">
          <ExploreUser
            userData={this.props.userData}
            user={user[0]}
            id={user[0].id}
            handleSearch={this.handleSearch}
            handleFollow={this.handleFollow}
            handleUnFollow={this.handleUnFollow}
          />
        </div>
      );
    });
    return (
      <div className="exploreWrapper">
        <div className="exploreHeader">Following</div>
        <div className="exploreUserWrapper">{following}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  userData: state.user
});

export default connect(
  mapStateToProps,
  { follow, unfollow, getFollowing }
)(Following);
