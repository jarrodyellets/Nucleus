import React from 'react'
import Post from './post';

const Posts = (props) => {
  const posts = props.user.timeline;
  const post = posts.map((post, i) => {
    return (
      <Post post={post} key={post.id} />
    )
  })
  return (
    <div className="postsWrapper">
      {post}
    </div>
  )
}

export default Posts;