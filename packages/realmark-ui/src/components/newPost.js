import React, { Component } from 'react'
import HomePage from './homePage';

class newPost extends Component {
  render() {
    return (
      <div className="newPostWrapper">
        <div className="newPostInnerWrapper">
          <HomePage />
        </div>
        <div className="newPostBlackoutWrapper">
          <div className="newPostTextWindow"></div>
        </div>
      </div>
    )
  }
}

export default newPost;