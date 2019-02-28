import React from 'react';

const MessageModal = (props) => {
  return (
    <div className="modalWrapper">
      <div className="modalWindowWrapper">
        <div className="modalWindow">
          <div className="messageModalHeader">
            <div className="addCommentHeaderText">
              Message From {props.message.from}
            </div>
            <div className="addCommentClose">
              <i className="fas fa-times" onClick={props.handleClose} />
            </div>
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
