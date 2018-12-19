import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions/logoutAction';
import ProfileCard from './profileCard';
import Posts from './posts';


class UserProfile extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div>
        <div className="mainWrapper">
          <div className="profileCardWrapper">
            <ProfileCard user={this.props.user} />
          </div>
          <Posts user={this.props.user} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.currentUser
})

export default connect(mapStateToProps, {logOut})(UserProfile);