import React from 'react'

const ProfileCard = (props) => {
  return (
    <div className="profileCardWrapper">
      <div className="profileCardInnerWrapper">
        <img className="profileCardImg" alt="Profile" src="https://www.jarrodyellets.com/images/profilePlaceholder.png"/>
        <div className="profileCardInfoWrapper">
          <div className="profileCardFullName">Jarrod Yellets</div>
          <div className="profileCardUserName">@jarrodyellets</div>
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