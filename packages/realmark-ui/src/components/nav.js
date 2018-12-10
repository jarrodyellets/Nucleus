import React from 'react'

const Nav = (props) => {
  return (
    <div className="navWrapper">
      <div className="navInnerWrapper">
        <div className="navLeftWrapper">
          <div className="navLinks">
            <div className="navLink">Home</div>
            <div className="navLink">My Profile</div>
          </div>
        </div>
        <div className="navLogoWrapper">
          <img className="navLogo" alt="logo" src="https://www.jarrodyellets.com/images/BlogHubLogo.png"/>
        </div>
        <div className="navPostWrapper">
          <button className="navPost">Post</button>
          <div className="navLink">Log Out</div>
        </div>
      </div>
    </div>
  )
}

export default Nav;