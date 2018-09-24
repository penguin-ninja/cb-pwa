import React, { Component } from 'react';
import { PushButton, Loader } from '../components';

class BeltType2 extends Component {
  render() {
    const { device } = this.props;

    return (
      <div className="device-gui device-gui--belt">
        <div className="device-gui__row">
          <PushButton port={device.beltOnPNo} />
          <Loader port={device.beltOnPNo} />
        </div>
      </div>
    );
  }
}

export default BeltType2;
