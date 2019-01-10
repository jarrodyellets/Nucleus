import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './post';
import { triggerComment } from '../actions/triggerComment';
import { addComment } from '../actions/commentAction';

class AddComment extends Component {
  constructor(props){
    super(props);
    this.state = {
      comment: ''
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  handleClose(){
    this.props.triggerComment(false);
    const posts = document.querySelector('html');
    const nav = document.querySelector('.navWrapper');
    posts.classList.remove('noScroll');
    nav.classList.remove('marginRight');
  }

  handleComment(){
    this.props.addComment(this.props.post.id, this.props.post.postID, this.state)
    .then(() => {
      this.handleClose();
      this.setState({
        comment: ''
      })
    })

  }

  onChange(e){
    this.setState({
      comment: e.target.value
    })
  }

  render(){
    return (
      <div className="addCommentWrapper">
        <div className="addCommentBlackout">
          <div className="addCommentWindow">
            <div className="addCommentHeader">
              <div className="addCommentHeaderText">Reply to </div>
              <div className="addCommentClose"><i className="fas fa-times" onClick={this.handleClose}></i></div>
            </div>
            <div className="addCommentBody">
              <Post post={this.props.post} />
            </div>
            <div className="addCommentFooter">
              <div className="addCommentFooterTop">
                <div className="addCommentFooterTopText">Replying to ...</div>
              </div>
              <div className="addCommentFooterMiddle">
                <textarea className="addCommentFooterMiddleTextArea" onChange={this.onChange} value={this.state.comment} placeholder="Share you comment..." />
              </div>
              <div className="addCommentFooterBottom">
                <button className="newPostButton commentButton" onClick={() => {this.handleComment()}}>Reply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, {triggerComment, addComment})(AddComment);