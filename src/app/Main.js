import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';

import RootStore from './stores/root-store';
import history from './utils/history';
import App from './App';
import './Main.css';

class Main extends Component {
  render() {
    const rootStore = new RootStore();

    return (
      <Router history={history}>
        <Provider {...rootStore}>
          <App />
        </Provider>
      </Router>
    );
  }
}

export default Main;
