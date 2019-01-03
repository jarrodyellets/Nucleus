import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions/logoutAction';
import ProfileCard from './profileCard';
import Posts from './posts';
import EditContainer from './editContainer';


class HomePage extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div> 
        <div className="mainWrapper">
          <div className="profileCardWrapper">
            <ProfileCard user={this.props.user} />
            <EditContainer />
          </div>
          <Posts posts={this.props.user.timeline} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, {logOut})(HomePage);
