import React, { Component } from 'react';
import { connect } from 'react-redux';


class Explore extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: ''
    }
  }


  render(){
    return(
      <div className="exploreWrapper">
        <div className="exploreHeader">Top Users</div>
        <div className="exploreInnerWrapper">

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  allUsers: state.allUsers.allUsers
})

export default withRouter(connect(mapStateToProps,{searchUser})(Explore));