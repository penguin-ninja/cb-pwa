import React, { Component } from 'react';
import deviceDOMHoc from 'app/hocs/deviceDOMHoc';
import { Toggle, Loader } from './components';

class Horn extends Component {
  render() {
    const { device } = this.props;
    return (
      <div className="device-gui device-gui--horn">
        <div className="device-gui__row">
          <Toggle port={device.switchPNo} />
          <Loader port={device.switchPNo} />
        </div>
      </div>
    );
  }
}

export default deviceDOMHoc(Horn);
