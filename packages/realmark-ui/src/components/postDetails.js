import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './post';
import { triggerComment } from '../actions/triggerComment';

class PostDetails extends Component {
  constructor(props){
    super(props);

    this.handleClose = this.handleClose.bind(this);

  }

  handleClose(){
    this.props.triggerComment(false);
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
          <Post post={this.props.post} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  trigger: state.trigger
})

export default connect(mapStateToProps, {triggerComment})(PostDetails);