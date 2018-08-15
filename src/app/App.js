import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar/NavigationBar';
import SideBar from './components/SideBar/SideBar';

import Home from './containers/Home/Home';

class App extends Component {
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
        <SideBar>
          Sidebar placeholder
        </SideBar>
      </div>
    );
  }
}

export default App;
