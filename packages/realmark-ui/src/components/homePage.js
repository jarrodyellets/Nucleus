import React from 'react'
import Nav from './nav';
import ProfileCard from './profileCard';
import Posts from './posts';

const HomePage = (props) => {
  return (
    <div>
      <Nav />
      <div className="mainWrapper">
        <ProfileCard />
        <Posts />
      </div>
    </div>
  )
}

export default HomePage
