import React from 'react';

const ExploreUser = (props) => {
  return(
    <div className="exploreInnerWrapper">
      <div className="exploreImgWrapper">
        <img className="exploreImg" alt="Profile" src={props.user.imageURL ? props.user.imageURL : "https://www.jarrodyellets.com/images/profilePlaceholder.png"}/>      
      </div>
      <div className="profileCardInfoWrapper">
        <div className="profileCardNameWrapper">
          <div className="exploreFullName" onClick={() => {props.handleSearch(props.user.userName)}}>{props.user.firstName} {props.user.lastName}</div>
          {props.userData.id != props.user.id & props.userData.following.indexOf(props.user.id) == -1 ? <button onClick={() => {props.handleFollow(props.user.id)}} className="profileCardFollowButton">Follow</button> : <button onClick={() => {props.handleUnFollow(props.user.id)}} className="profileCardFollowButton">Unfollow</button>}
        </div>
        <div className="profileCardUserName">@{props.user.userName}</div>
        <div className="profileCardContactWrapper">
          <div className="profileCardContact"><i className="far fa-envelope fa-icon"></i> {props.user.email}</div>
          <div className="profileCardLocation"><i className="fas fa-map-pin fa-icon"></i> {props.user.location}</div>
        </div>
        <div className="profileCardPostsWrapper">
          <div className="profileCardInnerPostsWrapper">
            <div className="profileCardHeading">Posts:</div>
            <div className="profileCardNumbers">{props.user.posts.length}</div>
          </div>
          <div className="profileCardInnerPostsWrapper">
            <div className="profileCardHeading">Following:</div>
            <div className="profileCardNumbers">{props.user.following.length}</div>
          </div>
          <div className="profileCardInnerPostsWrapper">
            <div className="profileCardHeading">Followers:</div>
            <div className="profileCardNumbers">{props.user.followers.length}</div>
          </div>
        </div>
      </div>
    </div>
  )
  
}

export default ExploreUser;