import React, { Component } from 'react';
import deviceDOMHoc from 'app/hocs/deviceDOMHoc';
import { Loader, Toggle } from './components';

class Screw extends Component {
  render() {
    const { device } = this.props;
    return (
      <div className="device-gui device-gui--screw">
        <div className="device-gui__row">
          <Toggle port={device.switchOnePNo} />
          <Loader port={device.switchOnePNo} />
        </div>
      </div>
    );
  }
}

export default deviceDOMHoc(Screw);
