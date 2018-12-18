import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions/logoutAction';
import ProfileCard from './profileCard';
import Posts from './posts';


class HomePage extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div>
        
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
