import React from 'react';
import { connect } from 'react-redux';
import PostDetails from './postDetails';
import AddComment from './addComment';

const PostModal = (props) => {
  return (
    <div className="addCommentWrapper">
      <div className="addCommentBlackout">
        <div className="addCommentWindow">
          <PostDetails post={props.post} />
          {props.trigger.comment && <AddComment post={props.post} />}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  trigger: state.trigger
})

export default connect(mapStateToProps)(PostModal);