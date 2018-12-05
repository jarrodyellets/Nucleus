import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/main';
import './index.css';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));


