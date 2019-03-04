import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMail } from '../actions/message';
import { reply } from '../actions/triggerActions';

class Reply extends Component {
  constructor(props) {
    super(props);

    const date = new Date(this.props.message.date);
    const stringDate = date.toLocaleString('en-US', { hour12: false }).replace(/,/g, ' ')
    this.state = {
      subject: 'RE: ' + this.props.message.subject,
      message: '\n\n' + 'On ' + stringDate + ' ' + this.props.message.from + ' wrote:' + '\n' + this.props.message.message,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleMail = this.handleMail.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  handleClose() {
    this.props.reply(false);
  }

  handleMail() {
    this.props.sendMail(this.state, this.props.message.id)
    .then(() => {
      this.handleClose(false);
    })
  }

  onChange(e) {
    console.log(this.state.message);
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="modalWrapper">
        <div className="modalWindowWrapper">
          <div className="modalWindow">
            <div className="messageModalHeader">
              <div className="addCommentHeaderText">
                Reply to {this.props.message.from}
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
  { reply, sendMail }
)(Reply);