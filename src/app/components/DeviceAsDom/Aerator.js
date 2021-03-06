import React, { Component } from 'react';
import deviceDOMHoc from 'app/hocs/deviceDOMHoc';
import { Loader, Toggle } from './components';

class Aerator extends Component {
  render() {
    const { device } = this.props;

    return (
      <div className="device-gui device-gui--aerator">
        <div className="device-gui__row">
          <Toggle port={device.switchPNo} />
          <Loader port={device.switchPNo} />
        </div>
      </div>
    );
  }
}

export default deviceDOMHoc(Aerator);
