import React, { Component } from 'react'
import Post from './post';
import LikesContainer from './likesContainer';


class Posts extends Component {
  constructor(props){
    super(props);



  }

  render(){
    console.log(this.props.posts);
    const posts = this.props.posts.sort(function(a, b){
      return b.date - a.date
    });
    const post = posts.map((post, i) => {
      return (
        <div className="postMainWrapper" key={this.props.id} onClick={() => {this.props.handleModal(true, post)}}>
          <Post post={post} key={post.id} id={this.props.id} handleLike={this.props.handleLike} handleTrigger={this.props.handleTrigger} />
          <LikesContainer post={post} key={post.id} id={this.props.id} handleLike={this.props.handleLike} handleTrigger={this.props.handleTrigger} />
        </div>
      )
    })
    return (
      <div className="postsWrapper">
        {post}
      </div>
    )
  }
}

export default Posts;