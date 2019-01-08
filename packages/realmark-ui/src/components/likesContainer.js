import React from 'react'

const LikesContainer = (props) => {
  return (
    <div className="postLikesWrapper">
      <div className={props.post.likes.includes(props.id) ? "postUserLikes" : "postLikes"} onClick={() => {props.handleLike(props.post.id, props.post.postID)}}>Like {props.post.likes && '(' + props.post.likes.length + ')'}</div>
      <div className="postLikes" onClick={() => {props.handleTrigger(true, props.post)}}>Comment</div>
    </div>
  )
}

export default LikesContainer;