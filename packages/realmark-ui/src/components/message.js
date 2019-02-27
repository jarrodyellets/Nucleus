import React from 'react'

const Message = (props) => {
  return (
    <div className="messageWrapper">
      <div className="messageBody">
        <div className="messageSubject">{props.subject}</div>
        <div className="messageAuthor">{props.author}</div>
        <div className="messageDate">{props.date}</div>
      </div>
    </div>
  )
}

export default Message;