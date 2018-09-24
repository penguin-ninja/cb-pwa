import React, { Component } from 'react';
import { NormalButton, Loader } from '../components';

class BeltType1 extends Component {
  render() {
    const { device } = this.props;

    return (
      <div className="device-gui device-gui--belt">
        <div className="device-gui__row">
          <NormalButton bsStyle="success" port={device.beltOnPNo}>
            On
          </NormalButton>
          <NormalButton bsStyle="danger" port={device.beltOffPNo}>
            Off
          </NormalButton>
          <Loader port={device.beltOnPNo} />
        </div>
      </div>
    );
  }
}

export default BeltType1;
