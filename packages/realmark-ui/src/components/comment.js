import React from 'react'
import ReactMarkdown from 'react-markdown';
import CodeBlock from './markdown-render/codeblock';
import CodeInline from './markdown-render/codeinline';

const Comment = (props) => {
  const now = Date.now();
  let difference = now - props.comment.date;
  const minDifference = Math.floor(difference/1000/60);
  console.log(props);
  return (
    <div className="postWrapper">
      <div className="postHeadingWrapper">
        <img className="postImg" alt="profile" src={props.comment.imageURL ? props.comment.imageURL : "https://www.jarrodyellets.com/images/profilePlaceholder.png"} />
        <div className="commentHeadingTextWrapper">
          <div className="commentHeadingFullName">
            <div className="commentHeadingTextFullName">{props.comment.firstName} {props.comment.lastName}</div>
            <div className="commentHeadingTextUserName">@{props.comment.username}</div>
            <div className="commentHeadingTextTime">{minDifference}m</div>
          </div>
          <div className="commentTextReplyTo">Replying to @{props.currentPost.username}</div>
        </div>
      </div>
      <div className="postTextWrapper">
        <ReactMarkdown source={props.comment.post} renderers={{code: CodeBlock, inlineCode: CodeInline}} className="postText" />
      </div>
    </div>
  )
}

export default Comment;