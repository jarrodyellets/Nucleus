import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions/logoutAction';
import Nav from './nav';
import ProfileCard from './profileCard';
import Posts from './posts';


class HomePage extends Component {
  constructor(props){
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);

  }

  handleLogOut(){
    this.props.logOut()
    .then(() => {
      if(!this.props.user.login){
        this.props.history.push('/')
      }
    })
  }

  render(){
    return (
      <div>
        <Nav handleLogOut={this.handleLogOut} />
        <div className="mainWrapper">
          <ProfileCard user={this.props.user} />
          <Posts user={this.props.user} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, {logOut})(HomePage);
