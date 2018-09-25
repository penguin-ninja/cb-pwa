import React, { Component } from 'react';
import deviceDOMHoc from 'app/hocs/deviceDOMHoc';
import { Loader, Toggle } from './components';

class Switch extends Component {
  render() {
    const { device } = this.props;
    return (
      <div className="device-gui device-gui--switch">
        <div className="device-gui__row">
          <Toggle port={device.switchOnPNo} />
          <Loader port={device.switchOnPNo} />
        </div>
      </div>
    );
  }
}

export default deviceDOMHoc(Switch);
