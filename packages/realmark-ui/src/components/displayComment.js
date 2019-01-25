import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from './comment';
import LikesContainer from './likesContainer';
import { addLike, disLike } from '../actions/likeAction';

class DisplayComment extends Component {
  constructor(props) {
    super(props);

    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
  }

  handleLike(event, userID, postID, path) {
    event.stopPropagation();
    this.props.addLike(userID, postID, path);
  }

  handleDislike(event, userID, postID, path) {
    event.stopPropagation();
    this.props.disLike(userID, postID, path);
  }

  render() {
    const comments = this.props.comments.sort(function(a, b) {
      return a.date - b.date;
    });
    const comment = comments.map((comment, i) => {
      return (
        <div
          className="commentsMainWrapper"
          key={this.props.id}
          onClick={() => {
            this.props.handleModal(true, comment);
            this.props.handleSelectedPost(comment.postID);
          }}>
          <Comment
            comment={comment}
            handleLike={this.props.handleLike}
            currentPost={this.props.currentPost}
            handleTrigger={this.props.handleTrigger}
            handleSearch={this.props.handleSearch}
          />
          <LikesContainer
            post={comment}
            id={this.props.user.id}
            handleLike={this.handleLike}
            handleDislike={this.handleDislike}
            handleTrigger={this.props.handleTrigger}
          />
        </div>
      );
    });
    return <div className="commentsWrapper">{comment}</div>;
  }
}

const mapStateToProps = state => ({
  user: state.user,
  currentPost: state.trigger.currentPost
});

export default connect(
  mapStateToProps,
  { addLike, disLike }
)(DisplayComment);
