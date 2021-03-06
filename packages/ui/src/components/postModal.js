import React from 'react';
import { connect } from 'react-redux';
import PostDetails from './postDetails';
import AddComment from './addComment';
import DisplayComment from './displayComment';

const PostModal = props => {
  return (
    <div className="modalWrapper">
      <div className="modalWindowWrapper">
        <div className="modalWindow">
          <PostDetails handleSelectedPost={props.handleSelectedPost} handleTrigger={props.handleTrigger} />
          {props.trigger.comment && <AddComment post={props.trigger.currentPost} handleTrigger={props.handleTrigger} />}
          {props.trigger.modal & !props.trigger.comment && (
            <DisplayComment
              handleSelectedPost={props.handleSelectedPost}
              post={props.trigger.currentPost}
              handleModal={props.handleModal}
              comments={props.post.comments}
              id={props.user.id}
              handleSearch={props.handleSearch}
              handleTrigger={props.handleTrigger}
            />
          )}
          {props.trigger.modal & !props.trigger.comment && (
            <div className="modalFooter">
              <img className="navLogo" alt="logo" src="https://www.jarrodyellets.com/images/BlogHubLogo.png" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  trigger: state.trigger
});

export default connect(mapStateToProps)(PostModal);
