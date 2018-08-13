import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar/NavigationBar';

import Home from './screens/Home/Home';

class WebsiteRouter extends Component {
  render() {
    return (
      <div className="page-wrapper">
        <NavigationBar />
        <div className="page-container">
          <div className="page-content-wrapper">
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default WebsiteRouter;
