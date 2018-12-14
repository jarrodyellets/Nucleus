import React from 'react'
import Post from './post';

const Posts = (props) => {
  const posts = props.user.posts;
  const post = posts.map((post, i) => {
    return (
      <Post user={props.user} post={post} key={post.id} />
    )
  })
  return (
    <div className="postsWrapper">
      {post}
    </div>
  )
}

export default Posts;