import React from 'react'

const Post = (props) => {
  return (
    <div className="postWrapper">
      <div className="postHeadingWrapper">
        <img className="postImg" alt="profile" src="https://www.jarrodyellets.com/images/profilePlaceholder.png" />
        <div className="postHeadingTextWrapper">
          <div className="postHeadingTextFullName">Jarrod Yellets <span className="postHeadingTextTime">16m</span></div>
          <div className="postHeadingTextUserName">@jarrodyellets</div>
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