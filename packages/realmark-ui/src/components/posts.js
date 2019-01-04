import React from 'react'
import Post from './post';

const Posts = (props) => {
  const posts = props.posts.sort(function(a, b){
    return b.date - a.date
  });
  const post = posts.map((post, i) => {
    return (
      <Post post={post} key={post.id} id={props.id} handleLike={props.handleLike} />
    )
  })
  return (
    <div className="postsWrapper">
      {post}
    </div>
  )
}

export default Posts;