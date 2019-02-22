import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerMessage } from '../actions/triggerActions';

class NewMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.triggerMessage(false);
  }

  render() {
    return (
    <div className="modalWrapper">
      <div className="modalWindowWrapper">
        <div className="modalWindow">
            <div className="addCommentHeader">
            <div className="addCommentHeaderText">
                {this.props.trigger.comment &&
                'Reply to ' +
                    this.props.trigger.currentPost.firstName +
                    ' ' +
                    this.props.trigger.currentPost.lastName}{' '}
            </div>
            <div className="addCommentClose">
                <i className="fas fa-times" onClick={this.handleClose} />
            </div>
            </div>
            <div className="modalFooter">
              <img className="navLogo" alt="logo" src="https://www.jarrodyellets.com/images/BlogHubLogo.png" />
            </div>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
    user: state.user,
    trigger: state.trigger
  });

export default connect(mapStateToProps, {triggerMessage})(NewMessage);
