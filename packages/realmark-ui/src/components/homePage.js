import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions/logoutAction';
import { addLike } from '../actions/likeAction';
import ProfileCard from './profileCard';
import Posts from './posts';
import EditContainer from './editContainer';
import AddComment from './addComment';


class HomePage extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);

    this.handleLike = this.handleLike.bind(this);

  }

  handleLike(userID, postID){
    this.props.addLike(userID, postID);
  }

  render(){
    console.log(this.props.user.timeline)
    return (
      <div> 
        <div className="mainWrapper">
          <div className="profileCardWrapper">
            <ProfileCard user={this.props.user} />
            <EditContainer />
          </div>
          <Posts posts={this.props.user.timeline} id={this.props.user.id} handleLike={this.handleLike} />
        </div>
        {this.props.trigger.comment && <AddComment post={this.props.trigger.currentPost} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  trigger: state.trigger
})

export default connect(mapStateToProps, {logOut, addLike})(HomePage);
