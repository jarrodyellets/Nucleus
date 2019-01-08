import React from 'react';
import ProfileCard from './profileCard';
import Posts from './posts';
import EditContainer from './editContainer';
import AddComment from './addComment';


const UserProfile = (props) => {
  return (
    <div>
      <div className="mainWrapper">
        <div className="profileCardWrapper">
          <ProfileCard user={props.user} />
          {props.location.pathname === '/myprofile' && <EditContainer />}
        </div>
        <Posts posts={props.user.posts} id={props.id} />
      </div>
      {this.props.trigger.comment && <AddComment post={props.trigger.currentPost} />}
    </div>
  )
}




export default UserProfile;