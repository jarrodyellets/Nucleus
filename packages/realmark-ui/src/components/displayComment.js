import React, { Component } from 'react';
import Comment from './comment';
import LikesContainer from './likesContainer';

class DisplayComment extends Component {

  render(){
    const comments = this.props.comments.sort(function(a, b){
      return a.date - b.date
    });
    const comment = comments.map((comment, i) => {
      return (
        <div className="commentsMainWrapper" key={this.props.id} onClick={() => {this.props.handleModal(true, comment)}}>
          <Comment comment={comment} handleLike={this.props.handleLike} handleTrigger={this.props.handleTrigger} />
          <LikesContainer post={comment} id={this.props.id} handleLike={this.props.handleLike} handleTrigger={this.props.handleTrigger} />
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

export default DisplayComment;