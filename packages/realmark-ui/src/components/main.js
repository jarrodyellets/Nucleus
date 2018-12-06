import React, { Component } from 'react';
import Splash from './splash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: true
    }
  }
  
  render() {
    return (
      <div className="App">
        <Splash member={this.state.member}/>
      </div>
    );
  }
}

export default App;
