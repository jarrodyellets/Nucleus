import React from 'react';

const MessageModal = props => {
  const date = new Date(props.message.date);
  return (
    <div className="modalWrapper">
      <div className="modalWindowWrapper">
        <div className="modalWindow">
          <div className="messageModalHeader">
            Message
            <div className="addCommentClose">
              <i className="fas fa-times" onClick={props.handleClose} />
            </div>
          </div>
          <div className="messageModalBody">
            <div className="messageModalBodyTop">
              <div className="mailBodyAbout">
                <div className="mailModalFrom">From: {props.message.from}</div>
                <div className="mailModalSubject">
                  Subject: <span className="mailModalSubjectSpan">{props.message.subject}</span>
                </div>
                <div className="mailModalTo">To: {props.message.to}</div>
                <div className="mailModalDate">
                  Date: {date.toLocaleString('en-US', { hour12: false }).replace(/,/g, ' ')}
                </div>
              </div>
              <div className="mailBodyButtons">
                <button className="messageModalButton">Reply</button>
                <button className="messageModalButton" onClick={() => {props.handleDelete(props.message.messageID)}}>Delete</button>
              </div>
            </div>
            <div>{props.message.message}</div>
          </div>
          <div className="messageModalFooter">
            <img className="navLogo" alt="logo" src="https://www.jarrodyellets.com/images/BlogHubLogo.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
