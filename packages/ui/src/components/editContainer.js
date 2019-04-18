import React from 'react';

const EditContainer = props => {
  return (
    <div className="editWrapper">
      <button
        onClick={() => {
          props.handle(props.user.id);
        }}
        className={props.class}>
        {props.text}
      </button>
      {props.message && (
        <button onClick={() => props.handleMessage()} className={props.class}>
          Message
        </button>
      )}
    </div>
  );
};

export default EditContainer;
