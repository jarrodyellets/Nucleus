import React from 'react'

const EditContainer = (props) => {
  return (
        <div className="editWrapper">
            <button className={props.class}>{props.text}</button>
        </div>
  )
}

export default EditContainer;