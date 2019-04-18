import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import Main from './components/main';
import './index.css';

class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));


