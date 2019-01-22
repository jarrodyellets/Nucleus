import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './post';
import LikesContainer from './likesContainer';
import { triggerComment } from '../actions/triggerComment';
import { selectedPost } from '../actions/selectedPost';
import { addLike, disLike } from '../actions/likeAction';

class PostDetails extends Component {
  constructor(props){
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);

  }

  handleLike(event, userID, postID, path){
    event.stopPropagation();
    this.props.addLike(userID, postID, path);
  }

  handleDislike(event, userID, postID, path){
    event.stopPropagation();
    this.props.disLike(userID, postID, path);
  }

  handleClose(){
    this.props.triggerComment(false);
    this.props.selectedPost('');
    const posts = document.querySelector('html');
    const nav = document.querySelector('.navWrapper');
    posts.classList.remove('noScroll');
    nav.classList.remove('marginRight');
  }

  render(){
    return (
      <div>
        <div className="addCommentHeader">
          <div className="addCommentHeaderText">{this.props.trigger.comment && 'Reply to ' + this.props.post.firstName + ' ' + this.props.post.lastName} </div>
          <div className="addCommentClose"><i className="fas fa-times" onClick={this.handleClose}></i></div>
        </div>
        <div className="addCommentBody">
          <Post post={this.props.post} selectedPost={this.props.trigger.selectedPost} />
          <LikesContainer post={this.props.post} id={this.props.user.id} handleDislike={this.handleDislike} handleLike={this.handleLike} handleTrigger={this.props.handleTrigger} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  trigger: state.trigger
})

export default connect(mapStateToProps, {triggerComment, selectedPost, addLike, disLike})(PostDetails);