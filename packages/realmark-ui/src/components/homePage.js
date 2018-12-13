import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import Nav from './nav';
import ProfileCard from './profileCard';
import Posts from './posts';


class HomePage extends Component {

  render(){
    return (
      <div>
        <Nav />
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

export default connect(mapStateToProps)(HomePage);
