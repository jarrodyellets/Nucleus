import React from 'react';

const Message = props => {
  const date = new Date(props.message.date);
  return (
    <div className="messageWrapper" onClick={() => {props.handleMessage(props.message)}}>
      <div className="messageBody">
        <div className="messageSubject">{props.message.subject}</div>
        <div className="messageAuthor">{props.received ? props.message.from : props.message.to}</div>
        <div className="messageDate">{date.toLocaleString('en-US', { hour12: false }).replace(/,/g, ' ')}</div>
      </div>
    </div>
  );
};

export default Message;
