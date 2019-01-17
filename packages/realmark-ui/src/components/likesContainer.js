import React from 'react'

const LikesContainer = (props) => {
  return (
    <div className="likesWrapper">
      <div className="likesInnerWrapper">
        <div className={props.post.likes.includes(props.id) ? "likesHeartUserLikes" : "likesHeart"}><i class="far fa-heart"></i>{props.post.likes.length}</div>
        <div className="likesComment">{props.post.comments.length === 1 ? '1 Comment' : props.post.comments.length +' Comments'}</div>
      </div>
      <div className="postLikesWrapper">
        <div className="postLikes" onClick={(e) => {props.post.likes.includes(props.id) ? props.handleDislike(e, props.post.id, props.post.postID, props.post.path) : props.handleLike(e, props.post.id, props.post.postID, props.post.path)}}>{props.post.likes.includes(props.id) ? 'Dislike' : 'Like'}</div>
        <div className="postComment" onClick={(e) => {props.handleTrigger(e, true, props.post)}}>Comment</div>
      </div>
    </div>
  )
}

export default LikesContainer;