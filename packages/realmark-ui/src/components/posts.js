import React from 'react'
import Post from './post';
import LikesContainer from './likesContainer';


const Posts = (props) => {
  const posts = props.posts.sort(function(a, b){
    return b.date - a.date
  });
  const post = posts.map((post, i) => {
    return (
      <div className="postMainWrapper" key={props.id}>
        <Post post={post} key={post.id} id={props.id} handleLike={props.handleLike} handleTrigger={props.handleTrigger} />
        <LikesContainer post={post} key={post.id} id={props.id} handleLike={props.handleLike} handleTrigger={props.handleTrigger} />
      </div>
    )
  })
  return (
    <div className="postsWrapper">
      {post}
    </div>
  )
}

export default Posts;