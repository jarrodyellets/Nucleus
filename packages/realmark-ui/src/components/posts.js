import React from 'react'
import Post from './post';

const Posts = (props) => {
  return (
    <div className="postsWrapper">
      <Post user={props.user}/>
      <Post user={props.user}/>
      <Post user={props.user}/>
      <Post user={props.user}/>
      <Post user={props.user}/>
      <Post user={props.user}/>
      <Post user={props.user}/>
      <Post user={props.user}/>
      <Post user={props.user}/>
      <Post user={props.user}/>
      <Post user={props.user}/>
    </div>
  )
}

export default Posts;