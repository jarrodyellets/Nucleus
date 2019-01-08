import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './post';

class AddComment extends Component {
  constructor(props){
    super(props);
    this.state = {
      comment: ''
    }

  }

  render(){
    return (
      <div className="addCommentWrapper">
        <div className="addCommentBlackout">
          <div className="addCommentWindow">
            <div className="addCommentHeader">
              <div className="addCommentHeaderText">Reply to </div>
              <div className="addCommentClose"><i className="fas fa-times"></i></div>
            </div>
            <div className="addCommentBody">
              <Post post={this.props.post} />
            </div>
            <div className="addCommentFooter">
              <div className="addCommentFooterTop">
                <div className="addCommentFooterTopText">Replying to ...</div>
              </div>
              <div className="addCommentFooterMiddle">
                <textarea className="addCommentFooterMiddleTextArea" placeholder="Share you comment..." />
              </div>
              <div className="addCommentFooterBottom">
                <button className="newPostButton">Reply</button>
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

export default connect(mapStateToProps)(AddComment);