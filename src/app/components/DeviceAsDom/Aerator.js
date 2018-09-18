import React, { Component } from 'react';
import deviceDOMHoc from 'app/hocs/deviceDOMHoc';
import Toggle from 'react-toggle';
import { Loader } from './components';

class Aerator extends Component {
  render() {
    return (
      <div className="device-gui device-gui--aerator">
        <div className="device-gui__row">
          <Toggle icons={{ checked: 'On', unchecked: 'Off' }} />
          <Loader loading />
        </div>
      </div>
    );
  }
}

export default deviceDOMHoc(Aerator);
