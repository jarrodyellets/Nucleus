import React from 'react'

const ProfileCard = (props) => {
  console.log(props.user);
  return (
    <div className="profileCardWrapper">
      <div className="profileCardInnerWrapper">
        <img className="profileCardImg" alt="Profile" src={props.user.imageURL}/>
        <div className="profileCardInfoWrapper">
          <div className="profileCardFullName">{props.user.firstName} {props.user.lastName}</div>
          <div className="profileCardUserName">@{props.user.username}</div>
          <div className="profileCardPostsWrapper">
            <div className="profileCardHeading">Posts:</div>
            <div className="profileCardHeading">Friends:</div>
            <div className="profileCardHeading">Likes:</div>
            <div className="profileCardNumbers">1,214</div>
            <div className="profileCardNumbers">56</div>
            <div className="profileCardNumbers">56</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard;