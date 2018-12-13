import React from 'react';
import Scroll from 'react-scroll-to-element';
import { withRouter } from 'react-router-dom';

const Nav = (props) => {
  return (
    <div className="navWrapper">
      <div className="navInnerWrapper">
        <div className="navLeftWrapper">
          <div className="navLinks">
            <div className={props.location.pathname === '/home' ? "navLinkActive" : "navLink"}>Home</div>
            <div className="navLink">My Profile</div>
            <div className="navLink">Explore</div>
            <div className="navLink">Mail</div>
          </div>
        </div>
        <div className="navLogoWrapper">
          <Scroll type="class" element="mainWrapper" offset={-60}>
            <img className="navLogo" alt="logo" src="https://www.jarrodyellets.com/images/BlogHubLogo.png"/>
          </Scroll>
        </div>
        <div className="navPostWrapper">
          <button className="navPost">Post</button>
          <div className="navLogout">Log Out</div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Nav);