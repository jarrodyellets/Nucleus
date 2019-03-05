import React, { Component } from 'react';
import { connect } from 'react-redux';
import { readMessage } from '../actions/triggerActions';
import { readMail } from '../actions/message';
import { deleteMail } from '../actions/message';
import Message from './message';
import MessageModal from './messageModal';
import Reply from './reply';

class Mail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      received: true,
      message: {}
    };

    this.handleReceived = this.handleReceived.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleReceived(received) {
    this.setState({
      received
    });
  }

  handleMessage(message) {
    this.setState({
      message
    });
    console.log(message);
    this.props.readMail(message.messageID, this.props.user.id)
    .then(() => {
      console.log(this.props.user.mail)
      this.props.readMessage(true);
    })
  }

  handleClose() {
    this.props.readMessage(false);
  }

  handleDelete(messageID) {
    const box = this.state.received ? 'received' : 'sent';
    this.props.deleteMail(messageID, box).then(() => {
      this.handleClose();
    });
  }
  render() {
    const mail = this.state.received ? this.props.user.mail.received : this.props.user.mail.sent;
    const messages = mail.map(message => {
      return <Message message={message} received={this.state.received} handleMessage={this.handleMessage} />;
    });
    return (
      <div className="mainWrapper">
        <div className="mailInnerWrapper">
          <div className="mailHeader">
            <div
              className={this.state.received ? 'mailHeaderActive' : 'mailHeaderOff'}
              onClick={() => {
                this.handleReceived(true);
              }}>
              <i class="fas fa-inbox" /> Inbox
            </div>
            <div
              className={this.state.received ? 'mailHeaderOff' : 'mailHeaderActive'}
              onClick={() => {
                this.handleReceived(false);
              }}>
              <i class="far fa-paper-plane" /> Sent
            </div>
          </div>
          <div className="mailBoxWrapper">
            <div className="mailBoxHeader">
              <div className="mailBoxSubject mailBoxHeaderText">Subject</div>
              <div className="mailBoxAuthor mailBoxHeaderText">{this.state.received ? 'From' : 'To'}</div>
              <div className="mailBoxDate mailBoxHeaderText">Date</div>
            </div>
            <div className="mailBoxBody">{messages}</div>
          </div>
        </div>
        {this.props.trigger.readMessage && (
          <MessageModal message={this.state.message} handleClose={this.handleClose} handleDelete={this.handleDelete} />
        )}
        {this.props.trigger.reply && (
          <Reply message={this.state.message} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  trigger: state.trigger
});

export default connect(
  mapStateToProps,
  { readMessage, readMail, deleteMail }
)(Mail);
