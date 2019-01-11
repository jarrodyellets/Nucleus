import React from 'react'

const LikesContainer = (props) => {
  return (
    <div className="likesWrapper">
      <div className="likesInnerWrapper">
        <div className={props.post.likes.includes(props.id) ? "likesHeartUserLikes" : "likesHeart"}><i class="far fa-heart"></i>{props.post.likes.length}</div>
        <div className="likesComment">{props.post.comments.length === 1 ? '1 Comment' : props.post.comments.length +' Comments'}</div>
      </div>
      <div className="postLikesWrapper">
        <div className="postLikes" onClick={() => {props.handleLike(props.post.id, props.post.postID)}}>{props.post.likes.includes(props.id) ? 'Dislike' : 'Like'}</div>
        <div className="postComment" onClick={() => {props.handleTrigger(true, props.post)}}>Comment</div>
      </div>
    </div>
  )
}

export default LikesContainer;