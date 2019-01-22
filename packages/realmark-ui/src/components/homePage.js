import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions/logoutAction';
import { addLike, disLike } from '../actions/likeAction';
import { triggerComment } from '../actions/triggerComment';
import { triggerModal } from '../actions/triggerModal';
import { selectedPost } from '../actions/selectedPost';
import { searchUser } from '../actions/searchAction';
import ProfileCard from './profileCard';
import Posts from './posts';
import EditContainer from './editContainer';
import PostModal from './postModal';


class HomePage extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);

    this.handleLike = this.handleLike.bind(this);
    this.handleTrigger = this.handleTrigger.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleSelectedPost = this.handleSelectedPost.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

  }

  handleLike(event, userID, postID, path){
    event.stopPropagation();
    this.props.addLike(userID, postID, path);
  }

  handleDislike(event, userID, postID, path){
    event.stopPropagation();
    this.props.disLike(userID, postID, path);
  }

  handleTrigger(event, trigger, post){
    event.stopPropagation();
    this.props.triggerComment(trigger, post);
    const posts = document.querySelector('html');
    const nav = document.querySelector('.navWrapper');
    posts.classList.add('noScroll');
    nav.classList.add('marginRight');
  }

  handleModal(trigger, post){
    this.props.triggerModal(trigger, post);
    const posts = document.querySelector('html');
    const nav = document.querySelector('.navWrapper');
    posts.classList.add('noScroll');
    nav.classList.add('marginRight');
  }

  handleSelectedPost(post){
    this.props.selectedPost(post);
  }

  handleSearch(name){
    this.props.searchUser(name)
    .then(() => {
      if(this.props.currentUser.username){
        this.props.triggerModal(false, {});
        this.handleSelectedPost({});
        const posts = document.querySelector('html');
        const nav = document.querySelector('.navWrapper');
        posts.classList.remove('noScroll');
        nav.classList.remove('marginRight');
        this.props.history.push('/user');
      }
    })
  }

  render(){
    return (
      <div> 
        <div className="mainWrapper">
          <div className="profileCardWrapper">
            <ProfileCard user={this.props.user} />
            <EditContainer />
          </div>
          <Posts posts={this.props.posts} id={this.props.id} handleLike={this.handleLike} handleDislike={this.handleDislike} handleTrigger={this.handleTrigger} handleModal={this.handleModal} handleSelectedPost={this.handleSelectedPost}/>
        </div>
        {this.props.trigger.modal && <PostModal handleSelectedPost={this.handleSelectedPost} post={this.props.trigger.currentPost} handleSearch={this.handleSearch} handleTrigger={this.handleTrigger} handleModal={this.handleModal}/>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  trigger: state.trigger,
})

export default connect(mapStateToProps, {logOut, addLike, disLike, triggerComment, triggerModal, selectedPost, searchUser})(HomePage);
