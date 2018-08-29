import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Switch, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar/NavigationBar';
import PageLoading from './components/PageLoading/PageLoading';

import Home from './containers/Home/Home';
import Devices from './containers/Devices/Devices';
import Diagnose from './containers/Diagnose/Diagnose';

@inject('authStore')
@observer
class App extends Component {
  render() {
    const { isLoaded } = this.props.authStore;

    if (!isLoaded) {
      return <PageLoading />;
    }

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
        <Diagnose />
        <Devices />
      </div>
    );
  }
}

export default App;
