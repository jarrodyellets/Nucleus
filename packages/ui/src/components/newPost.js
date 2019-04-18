import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './homePage';
import { addPost } from '../actions/postAction';

class newPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: ''
    };

    this.onChange = this.onChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  onChange(e) {
    this.setState({
      post: e.target.value
    });
  }

  handlePost() {
    this.props.addPost(this.state).then(() => {
      this.props.history.push('/home');
    });
  }

  render() {
    return (
      <div className="newPostWrapper">
        <div className="newPostInnerWrapper">
          <HomePage location={this.props.location} user={this.props.user} id={this.props.user.id} posts={this.props.user.timeline} />
        </div>
        <div className="newPostBlackoutWrapper">
          <div className="newPostTextWindow">
            <div className="newPostWindowHeaderWrapper">
              <div className="newPostWindowHeader">Compose New Post</div>
              <Link to="/home">
                <div className="newPostWindowClose">
                  <i className="fas fa-times" />
                </div>
              </Link>
            </div>
            <div className="newPostWindowPostWrapper">
              <img className="newPostImg" src={this.props.user.imageURL} alt="profile" />
              <textarea
                className="newPostTextArea"
                onChange={this.onChange}
                value={this.state.post}
                placeholder="Share your thoughts..."
              />
            </div>
            <div className="newPostButtonWrapper">
              <button
                className="newPostButton"
                onClick={() => {
                  this.handlePost();
                }}>
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addPost }
)(newPost);
