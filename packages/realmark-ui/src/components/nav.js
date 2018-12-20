import React, { Component } from 'react';
import Scroll from 'react-scroll-to-element';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchUser } from '../actions/searchAction';
import { explore } from '../actions/exploreAction';

class Nav extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: ''
    }
    this.onChange = this.onChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleExplore = this.handleExplore.bind(this);
  }

  handleSearch(){
    this.props.searchUser(this.state.username)
    .then(() => {
      if(this.props.currentUser.username){
        this.props.handleNav('/search');
        this.setState({ username: '' })
      }
    })
  }

  handleExplore(){
    this.props.explore()
    .then(() => {
      this.props.handleNav('/explore');
    })
  }

  handleKeyPress(e){
    if(e.charCode === 13){
      this.props.searchUser(this.state.username)
      .then(() => {
        if(this.props.currentUser.username){
          this.props.handleNav('/search');
          this.setState({ username: '' })
        }
      })
    }
  }

  onChange(e){
    this.setState({
      username: e.target.value
    })
  }

  render(){
    return(
      <div className="navWrapper">
        <div className="navInnerWrapper">
          <div className="navLeftWrapper">
            <div className="navLinks">
              <div className={this.props.location.pathname === '/home' ? "navLinkActive" : "navLink"} onClick={() => {this.props.handleNav('/home')}} >Home</div>
              <div className="navLink">My Profile</div>
              <div className="navLink" onClick={this.handleExplore}>Explore</div>
              <div className="navLink">Mail</div>
            </div>
          </div>
          <div className="navLogoWrapper">
            <Scroll type="class" element="mainWrapper" offset={-60}>
              <img className="navLogo" alt="logo" src="https://www.jarrodyellets.com/images/BlogHubLogo.png"/>
            </Scroll>
          </div>
          <div className="navPostWrapper">
            <div className="searchBoxInputWrapper">
              <input className="searchBoxInput" name="search" onChange={this.onChange} onKeyPress={this.handleKeyPress} value={this.state.username} placeholder="Search Nucleus" />
              <i className="fas fa-search" onClick={this.handleSearch}></i>
            </div>
            <Link to="/post"><button className="navPost">Post</button></Link>
            <div className="navLogout" onClick={this.props.handleLogOut}>Log Out</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  allUsers: state.allUsers.allUsers
})

export default withRouter(connect(mapStateToProps,{searchUser, explore})(Nav));