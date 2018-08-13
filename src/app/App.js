import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';

import rootStore from './stores/root-store';
import history from './utils/history';
import WebsiteRouter from './WebsiteRouter';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Provider {...rootStore}>
          <WebsiteRouter />
        </Provider>
      </Router>
    );
  }
}

export default App;
