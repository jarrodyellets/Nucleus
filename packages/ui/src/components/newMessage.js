import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMail } from '../actions/message';
import { triggerMessage } from '../actions/triggerActions';

class NewMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      message: ''
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleMail = this.handleMail.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleClose() {
    this.props.triggerMessage(false);
  }

  handleMail() {
    this.props.sendMail(this.state, this.props.currentUser.id)
    .then(() => {
      this.handleClose(false);
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="modalWrapper">
        <div className="modalWindowWrapper">
          <div className="modalWindow">
            <div className="messageModalHeader">
              <div className="addCommentHeaderText">
                Message to {this.props.currentUser.firstName} {this.props.currentUser.lastName}
              </div>
              <div className="addCommentClose">
                <i className="fas fa-times" onClick={this.handleClose} />
              </div>
            </div>
            <div className="messageModalBody">
              <div className="messageInputWrapper">
                <div className="messageLabel">Subject:</div>
                <input
                  className="messageSubjectInput"
                  type="text"
                  name="subject"
                  onChange={this.onChange}
                  value={this.state.subject}
                />
              </div>
              <div className="messageInputWrapper messageMessage">
                <div className="messageLabel">Message:</div>
                <textarea
                  className="messageMessageInput"
                  name="message"
                  onChange={this.onChange}
                  value={this.state.message}
                />
              </div>
              <div className="messageButtonWrapper">
                <button className="messageButton" onClick={() => {this.handleMail()}}>Send</button>
              </div>
            </div>
            <div className="messageModalFooter">
              <img className="navLogo" alt="logo" src="https://www.jarrodyellets.com/images/BlogHubLogo.png" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  trigger: state.trigger,
  currentUser: state.currentUser
});

export default connect(
  mapStateToProps,
  { triggerMessage, sendMail }
)(NewMessage);
