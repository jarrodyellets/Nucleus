import React from 'react'
import ReactMarkdown from 'react-markdown';
import CodeBlock from './markdown-render/codeblock';
import CodeInline from './markdown-render/codeinline';

const Post = (props) => {
  const now = Date.now();
  let difference = now - props.post.date;
  const minDifference = Math.floor(difference/1000/60);

  return (
    <div className="postWrapper">
      <div className="postHeadingWrapper">
        <img className="postImg" alt="profile" src={props.post.imageURL ? props.post.imageURL : "https://www.jarrodyellets.com/images/profilePlaceholder.png"} />
        <div className="postHeadingTextWrapper">
          <div className="postHeadingTextFullName">{props.post.firstName} {props.post.lastName} <span className="postHeadingTextTime">{minDifference}m</span></div>
          <div className="postHeadingTextUserName">@{props.post.username}</div>
        </div>
      </div>
      <div className="postTextWrapper">
        <ReactMarkdown source={props.post.post} renderers={{code: CodeBlock, inlineCode: CodeInline}} className="postText" />
      </div>
      <div className="postLikesWrapper">
        <div className={props.post.likes.includes(props.id) ? "postUserLikes" : "postLikes"} onClick={() => {props.handleLike(props.post.id, props.post.postID)}}>Like {props.post.likes && '(' + props.post.likes.length + ')'}</div>
        <div className="postLikes">Comment</div>
      </div>
    </div>
  )
}

export default Post;