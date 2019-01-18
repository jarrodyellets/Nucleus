import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './post';
import LikesContainer from './likesContainer';


class Posts extends Component {
  constructor(props){
    super(props);
    this.state = {
      reload: null
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      reload: nextProps.reload
    })
  }

  render(){
    const posts = this.props.posts.sort(function(a, b){
      return b.date - a.date
    });
    const post = posts.map((post, i) => {
      return (
        <div className="postMainWrapper" key={post.id} onClick={() => {this.props.handleModal(true, post); this.props.handleSelectedPost(post.postID)}}>
          <Post post={post} id={this.props.id} handleLike={this.props.handleLike} handleTrigger={this.props.handleTrigger} selectedPost={this.props.trigger.selectedPost}/>
          <LikesContainer post={post} id={this.props.id} handleLike={this.props.handleLike} handleDislike={this.props.handleDislike} handleTrigger={this.props.handleTrigger} />
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

const mapStateToProps = state => ({
  trigger: state.trigger
})

export default connect(mapStateToProps)(Posts);