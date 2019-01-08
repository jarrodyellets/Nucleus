import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './markdown-render/codeblock';
import CodeInline from './markdown-render/codeinline';
import Post from './post';

class AddComment extends Component {
  constructor(props){
    super(props);
    this.state = {
      comment: ''
    }

  }

  render(){
    const now = Date.now();
    let difference = now - this.props.post.date;
    const minDifference = Math.floor(difference/1000/60);
    return (
      <div className="addCommentWrapper">
        <div className="addCommentBlackout">
          <div className="addCommentWindow">
            <div className="addCommentHeader">
              <div className="addCommentHeaderText">Reply to </div>
              <div className="addCommentClose"><i className="fas fa-times"></i></div>
            </div>
            <div className="addCommentBody">
              <div className="postWrapper">
                <div className="postHeadingWrapper">
                  <img className="postImg" alt="profile" src={this.props.post.imageURL ? this.props.post.imageURL : "https://www.jarrodyellets.com/images/profilePlaceholder.png"} />
                  <div className="postHeadingTextWrapper">
                    <div className="postHeadingTextFullName">{this.props.post.firstName} {this.props.post.lastName} <span className="postHeadingTextTime">{minDifference}m</span></div>
                    <div className="postHeadingTextUserName">@{this.props.post.username}</div>
                  </div>
                </div>
                <div className="postTextWrapper">
                  <ReactMarkdown source={this.props.post.post} renderers={{code: CodeBlock, inlineCode: CodeInline}} className="postText" />
                </div>
              </div>
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