import React, { Component } from 'react';
import { connect } from 'react-redux';
import { readMessage } from '../actions/triggerActions';
import Message from './message';
import MessageModal from './messageModal';

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
    this.props.readMessage(true);
  }

  handleClose() {
    this.props.readMessage(false);
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
          <MessageModal
            message={this.state.message}
            handleClose={this.handleClose}
          />
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
  { readMessage }
)(Mail);
