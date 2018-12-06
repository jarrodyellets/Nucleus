import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Splash from './splash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: true
    }

    this.changeMember = this.changeMember.bind(this);

  }

  changeMember(e){
    const member = e;
    this.setState({
      member
    })
  }
  
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={(props) => <Splash {...props} member={this.state.member} changeMember={this.changeMember} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
