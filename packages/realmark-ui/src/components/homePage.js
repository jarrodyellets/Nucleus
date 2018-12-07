import React from 'react'
import Nav from './nav';
import ProfileCard from './profileCard';

const HomePage = (props) => {
  return (
    <div>
      <Nav />
      <div className="mainWrapper">
        <ProfileCard />
      </div>
    </div>
  )
}

export default HomePage
