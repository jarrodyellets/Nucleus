import React, { Component } from 'react';
import Posts from './posts';

class DisplayComment extends Component {
  render() {
    return (
      <div className="commentsWrapper">
        <Posts posts={this.props.comments} />
      </div>
    )
  }
}

export default DisplayComment;