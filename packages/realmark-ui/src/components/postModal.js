import React from 'react';
import { connect } from 'react-redux';
import PostDetails from './postDetails';
import AddComment from './addComment';
import DisplayComment from './displayComment';

const PostModal = (props) => {
  console.log(props.post);
  return (
    <div className="addCommentWrapper">
      <div className="addCommentBlackout">
        <div className="addCommentWindow">
          <PostDetails post={props.post} />
          {props.trigger.comment && <AddComment post={props.post} />}
          {props.trigger.modal & !props.trigger.comment && <DisplayComment comments={props.post.comments} />}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  trigger: state.trigger
})

export default connect(mapStateToProps)(PostModal);