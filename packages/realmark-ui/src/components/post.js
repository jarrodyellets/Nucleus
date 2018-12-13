import React from 'react'

const Post = (props) => {
  return (
    <div className="postWrapper">
      <div className="postHeadingWrapper">
        <img className="postImg" alt="profile" src={props.user.imageURL ? props.user.imageURL : "https://www.jarrodyellets.com/images/profilePlaceholder.png"} />
        <div className="postHeadingTextWrapper">
          <div className="postHeadingTextFullName">{props.user.firstName} {props.user.lastName} <span className="postHeadingTextTime">16m</span></div>
          <div className="postHeadingTextUserName">@{props.user.username}</div>
        </div>
      </div>
      <div className="postTextWrapper">
        <div className="postText">This is my first post!</div>
      </div>
      <div className="postLikesWrapper">
        <div className="postLikes">Like</div>
        <div className="postLikes">Comment</div>
      </div>
    </div>
  )
}

export default Post;