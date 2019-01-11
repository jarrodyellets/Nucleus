import React, { Component } from 'react'
import Post from './post';
import LikesContainer from './likesContainer';


class Posts extends Component {
  constructor(props){
    super(props);

    this.handlePostModal = this.handlePostModal.bind(this);

  }

  handlePostModal(){
    return true;
  }

  render(){
    const posts = this.props.posts.sort(function(a, b){
      return b.date - a.date
    });
    const post = posts.map((post, i) => {
      return (
        <div className="postMainWrapper" key={this.props.id}>
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