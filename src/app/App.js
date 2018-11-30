import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, Switch, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar/NavigationBar';
import PageLoading from './components/PageLoading/PageLoading';

import Home from './containers/Home/Home';
import Schedules from './containers/Schedules/Schedules';
import Devices from './containers/Devices/Devices';
import Diagnose from './containers/Diagnose/Diagnose';
import Materials from './containers/Materials/Materials';
import Mix from './containers/Mix/Mix';

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
              <Route exact path="/materials" component={Materials} />
              <Route exact path="/mixes" component={Mix} />
            </Switch>
          </div>
        </div>
        <Diagnose />
        <Devices />
        <Schedules />
      </div>
    );
  }
}

export default withRouter(App);
