import React from 'react'

const Post = (props) => {
  const now = Date.now();
  let difference = now - props.post.date;
  const minDifference = Math.floor(difference/1000/60);

  console.log(props.post);
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
        <div className="postText">{props.post.post}</div>
      </div>
      <div className="postLikesWrapper">
        <div className="postLikes" onClick={() => {props.handleLike(props.post.id, props.post.postID)}}>Like {props.post.likes && '(' + props.post.likes.length + ')'}</div>
        <div className="postLikes">Comment</div>
      </div>
    </div>
  )
}

export default Post;