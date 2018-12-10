import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeMember } from '../actions/memberAction';
import Splash from './splash';
import HomePage from './homePage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: true
    }

    this.handleMember = this.handleMember.bind(this);

  }

  handleMember(e){
    const member = e;
    this.props.changeMember(member);
  }
  
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={(props) => <Splash {...props} member={this.props.member} handleMember={this.handleMember} />} />
          <Route path='/home' render={(props) => <HomePage {...props} member={this.props.member} handleMember={this.handleMember} />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  member: state.member.member
})

export default withRouter(connect(mapStateToProps, {changeMember})(App));
