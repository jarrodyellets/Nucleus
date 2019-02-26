import React, { Component } from 'react';
import Scroll from 'react-scroll-to-element';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchUser } from '../actions/searchAction';
import { explore } from '../actions/exploreAction';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleExplore = this.handleExplore.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
  }

  handleSearch() {
    this.props.searchUser(this.state.username).then(() => {
      if (this.props.currentUser.username) {
        this.props.handleNav('/search');
        this.setState({ username: '' });
      }
    });
  }

  handleProfile() {
    this.props.searchUser(this.props.user.username).then(() => {
      this.props.handleNav('/myprofile');
    });
  }

  handleExplore() {
    this.props.explore().then(() => {
      this.props.handleNav('/explore');
    });
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      this.props.searchUser(this.state.username).then(() => {
        if (this.props.currentUser.username) {
          this.props.handleNav('/search');
          this.setState({ username: '' });
        }
      });
    }
  }

  onChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  render() {
    console.log(this.props.user);
    return (
      <div className="navWrapper">
        <div className="navInnerWrapper">
          <div className="navLeftWrapper">
            <div className="navLinks">
              <div
                className={this.props.location.pathname === '/home' ? 'navLinkActive' : 'navLink'}
                onClick={() => {
                  this.props.handleNav('/home');
                }}>
                Home
              </div>
              <div
                className={this.props.location.pathname === '/myprofile' ? 'navLinkActive' : 'navLink'}
                onClick={() => {
                  this.handleProfile();
                }}>
                My Profile
              </div>
              <div
                className={this.props.location.pathname === '/explore' ? 'navLinkActive' : 'navLink'}
                onClick={this.handleExplore}>
                Explore
              </div>
              <div
                className="navLink"
                onClick={() => {
                  this.props.handleNav('/mail');
                }}>
                <div>Mail</div>
                {this.props.user.mail.recieved.length > 0 && <i class="fas fa-circle mailQuantity" />}
              </div>
            </div>
          </div>
          <div className="navLogoWrapper">
            <Scroll type="class" element="mainWrapper" offset={-60}>
              <img className="navLogo" alt="logo" src="https://www.jarrodyellets.com/images/BlogHubLogo.png" />
            </Scroll>
          </div>
          <div className="navPostWrapper">
            <div className="searchBoxInputWrapper">
              <input
                className="searchBoxInput"
                name="search"
                onChange={this.onChange}
                onKeyPress={this.handleKeyPress}
                value={this.state.username}
                placeholder="Search Nucleus"
              />
              <i className="fas fa-search" onClick={this.handleSearch} />
            </div>
            <Link to="/post">
              <button className="navPost">Post</button>
            </Link>
            <div className="navLogout" onClick={this.props.handleLogOut}>
              Log Out
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  allUsers: state.allUsers.allUsers,
  user: state.user
});

export default withRouter(
  connect(
    mapStateToProps,
    { searchUser, explore }
  )(Nav)
);
