import React, { Component } from 'react';
import Device from 'app/components/DeviceAsDom';
import './DeviceDOMCanvas.css';

class DeviceDOMCanvas extends Component {
  render() {
    return (
      <div className="device-dom-canvas">
        <Device.Aerator x={100} y={100} width={200} height={50} />
      </div>
    );
  }
}

export default DeviceDOMCanvas;
