import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Device from 'app/components/DeviceAsDom';
import './DeviceDOMCanvas.css';

@inject('devicesStore')
@observer
class DeviceDOMCanvas extends Component {
  renderDevice(device) {
    const { devicesStore } = this.props;
    const gui = devicesStore.getDeviceGUIById(device.id);
    const DeviceComponent = Device[device.deviceTypeName];

    return (
      <DeviceComponent
        key={`device_${device.id}`}
        x={gui.x}
        y={gui.y}
        z={gui.z}
        width={gui.length}
        height={gui.size}
        device={device}
        onEdit={() => devicesStore.startEdit(device.id, device.deviceTypeName)}
        onUpdate={params => devicesStore.upsertDeviceGUI(device.id, params)}
      />
    );
  }

  render() {
    const { devices } = this.props.devicesStore;
    return (
      <div className="device-dom-canvas">
        {devices.map(d => this.renderDevice(d))}
      </div>
    );
  }
}

export default DeviceDOMCanvas;
