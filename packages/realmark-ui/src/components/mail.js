import React, { Component } from 'react';

class Mail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
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
        </div>
      </div>
    );
  }
}

export default Mail;
