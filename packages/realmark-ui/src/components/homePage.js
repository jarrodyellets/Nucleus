import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions/userActions';
import { addLike, disLike } from '../actions/likeAction';
import { triggerComment, triggerModal, triggerEdit } from '../actions/triggerActions';
import { selectedPost } from '../actions/selectedPost';
import { searchUser } from '../actions/searchAction';
import { follow, unfollow } from '../actions/followAction';
import ProfileCard from './profileCard';
import Posts from './posts';
import EditContainer from './editContainer';
import PostModal from './postModal';
import EditProfile from './editProfile';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.handleLike = this.handleLike.bind(this);
    this.handleTrigger = this.handleTrigger.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleSelectedPost = this.handleSelectedPost.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnFollow = this.handleUnFollow.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
  }

  handleLike(event, userID, postID, path) {
    event.stopPropagation();
    this.props.addLike(userID, postID, path);
  }

  handleDislike(event, userID, postID, path) {
    event.stopPropagation();
    this.props.disLike(userID, postID, path);
  }

  handleTrigger(event, comment, modal, post) {
    event.stopPropagation();
    this.props.triggerComment(comment, modal, post);
    const posts = document.querySelector('html');
    const nav = document.querySelector('.navWrapper');
    posts.classList.add('noScroll');
    nav.classList.add('marginRight');
  }

  handleModal(trigger, post) {
    this.props.triggerModal(trigger, post);
    const posts = document.querySelector('html');
    const nav = document.querySelector('.navWrapper');
    posts.classList.add('noScroll');
    nav.classList.add('marginRight');
  }

  handleSelectedPost(post) {
    this.props.selectedPost(post);
  }

  handleSearch(name) {
    this.props.searchUser(name).then(() => {
      if (this.props.currentUser.username) {
        this.props.triggerModal(false, {});
        this.handleSelectedPost({});
        const posts = document.querySelector('html');
        const nav = document.querySelector('.navWrapper');
        posts.classList.remove('noScroll');
        nav.classList.remove('marginRight');
        this.props.history.push('/user');
      }
    });
  }

  handleFollow(id) {
    this.props.follow(id).then(() => {
      this.props.history.push('/home');
    });
  }

  handleUnFollow(id) {
    this.props.unfollow(id).then(() => {
      this.props.history.push('/home');
    });
  }

  handleProfile() {
    this.props.triggerEdit(true);
  }

  render() {
    return (
      <div>
        <div className="mainWrapper">
          <div className="profileCardWrapper">
            {this.props.trigger.edit ? <EditProfile /> : <ProfileCard user={this.props.user} />}
            {this.props.location.pathname === '/home' || this.props.location.pathname === '/myprofile' ? (
              <EditContainer handle={this.handleProfile} user={this.props.user} class={'editButton'} text={'Edit Profile'} />
            ) : null}
            {this.props.location.pathname === '/user' ? (
              this.props.signedUser.following.indexOf(this.props.user.id) === -1 ? (
                <EditContainer handle={this.handleFollow} user={this.props.user} class={'editButton'} text={'Follow'} />
              ) : (
                <EditContainer
                  handle={this.handleUnFollow}
                  user={this.props.user}
                  class={'editButton'}
                  text={'Unfollow'}
                />
              )
            ) : null}
          </div>
          <Posts
            posts={this.props.posts}
            id={this.props.id}
            handleLike={this.handleLike}
            handleDislike={this.handleDislike}
            handleTrigger={this.handleTrigger}
            handleModal={this.handleModal}
            handleSelectedPost={this.handleSelectedPost}
          />
        </div>
        {this.props.trigger.modal && (
          <PostModal
            handleSelectedPost={this.handleSelectedPost}
            post={this.props.trigger.currentPost}
            handleSearch={this.handleSearch}
            handleTrigger={this.handleTrigger}
            handleModal={this.handleModal}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trigger: state.trigger
});

export default connect(
  mapStateToProps,
  {
    logOut,
    addLike,
    disLike,
    triggerComment,
    triggerModal,
    selectedPost,
    searchUser,
    follow,
    unfollow,
    triggerEdit
  }
)(HomePage);
