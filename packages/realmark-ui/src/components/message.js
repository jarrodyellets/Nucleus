import React from 'react';

const Message = props => {
  const date = new Date(props.date);
  return (
    <div className="messageWrapper">
      <div className="messageBody">
        <div className="messageSubject">{props.subject}</div>
        <div className="messageAuthor">{props.author}</div>
        <div className="messageDate">{date.toLocaleString('en-US', { hour12: false }).replace(/,/g, ' ')}</div>
      </div>
    </div>
  );
};

export default Message;
