import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from './comment';
import LikesContainer from './likesContainer';
import { addLike } from '../actions/likeAction';

class DisplayComment extends Component {
  constructor(props){
    super(props);

    this.handleLike = this.handleLike.bind(this);

  }

  handleLike(event, userID, postID){
    event.stopPropagation();
    this.props.addLike(userID, postID);
  }

  render(){
    const comments = this.props.comments.sort(function(a, b){
      return a.date - b.date
    });
    const comment = comments.map((comment, i) => {
      return (
        <div className="commentsMainWrapper" key={this.props.id} onClick={() => {this.props.handleModal(true, comment)}}>
          <Comment comment={comment} handleLike={this.props.handleLike} handleTrigger={this.props.handleTrigger} />
          <LikesContainer post={comment} id={this.props.id} handleLike={this.handleLike} handleTrigger={this.props.handleTrigger} />
        </div>
      )
    })
    return (
      <div className="commentsWrapper">
        {comment}
      </div>
    )
  }
}

export default connect(null, {addLike})(DisplayComment);