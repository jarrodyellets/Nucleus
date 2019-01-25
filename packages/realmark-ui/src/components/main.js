import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeMember } from '../actions/memberAction';
import { checkLogin } from '../actions/checkLogin';
import { logOut } from '../actions/logoutAction';
import Splash from './splash';
import HomePage from './homePage';
import NewPost from './newPost';
import Nav from './nav';
import Search from './search';
import Explore from './explore';
import EditProfile from './editProfile';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleMember = this.handleMember.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleNav = this.handleNav.bind(this);
  }

  componentWillMount() {
    this.props.checkLogin().then(() => {
      if (this.props.user.login) {
        this.props.history.push('/home');
      }
    });
  }

  handleMember(e) {
    const member = e;
    this.props.changeMember(member);
  }

  handleLogOut() {
    this.props.logOut().then(() => {
      if (!this.props.user.login) {
        this.props.history.push('/');
      }
    });
  }

  handleNav(page) {
    this.props.history.push(page);
  }

  render() {
    return (
      <div className="app">
        {this.props.user.login && <Nav handleLogOut={this.handleLogOut} handleNav={this.handleNav} />}
        <Switch>
          <Route exact path="/" render={props => <Splash {...props} handleMember={this.handleMember} />} />
          <Route
            path="/home"
            render={props => (
              <HomePage {...props} user={this.props.user} id={this.props.user.id} posts={this.props.user.timeline} />
            )}
          />
          <Route
            path="/post"
            render={props => (
              <NewPost {...props} user={this.props.user} id={this.props.user.id} posts={this.props.user.timeline} />
            )}
          />
          <Route path="/search" component={Search} />
          <Route
            path="/user"
            render={props => (
              <HomePage
                {...props}
                user={this.props.currentUser}
                signedUser={this.props.user}
                id={this.props.user.id}
                posts={this.props.currentUser.posts}
              />
            )}
          />
          <Route path="/explore" component={Explore} />
          <Route path="/myprofile" render={props => (<HomePage {...props} user={this.props.user} id={this.props.user.id} posts={this.props.user.posts} /> )} />
          <Route path="/editprofile" render={props => (<EditProfile {...props} />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  currentUser: state.currentUser,
  error: state.error,
  trigger: state.trigger
});

export default withRouter(
  connect(
    mapStateToProps,
    { changeMember, checkLogin, logOut }
  )(App)
);
