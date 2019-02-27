import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './message';

class Mail extends Component {
  constructor(props) {
    super(props);
    this.state={
      received: true
    }
  }
  render() {
    console.log(this.props.user);
    const mail = this.props.user.mail.received.map((message) => {
      return (
        <Message subject={message.subject} author={message.from} date={message.date} />
      )
    })
    return (
      <div className="mainWrapper">
        <div className="mailInnerWrapper">
          <div className="mailHeader">
            <div className="mailHeaderReceived">
              <i class="fas fa-inbox" /> Inbox
            </div>
            <div className="mailHeaderSent">
              <i class="far fa-paper-plane" /> Sent
            </div>
          </div>
          <div className="mailBoxWrapper">
            <div className="mailBoxHeader">
              <div className="mailBoxSubject mailBoxHeaderText">Subject</div>
              <div className="mailBoxAuthor mailBoxHeaderText">From</div>
              <div className="mailBoxDate mailBoxHeaderText">Date</div>
            </div>
            <div className="mailBoxBody">
              {mail}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Mail);
