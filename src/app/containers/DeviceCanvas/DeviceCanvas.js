import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Device from 'app/components/Device';

class DeviceCanvas extends Component {
  render() {
    return (
      <Stage width={window.innerWidth - 40} height={window.innerHeight - 135}>
        <Layer>
          <Device.Aerator x={100} y={100} width={55} height={88} />
        </Layer>
      </Stage>
    );
  }
}

export default DeviceCanvas;
