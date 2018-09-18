import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Device from 'app/components/DeviceAsDom';
import NonDevice from 'app/components/NonDevice/NonDevice';
import './DeviceDOMCanvas.css';

@inject('devicesStore')
@observer
class DeviceDOMCanvas extends Component {
  renderDevice(device) {
    const { devicesStore } = this.props;
    const gui = devicesStore.getDeviceGUIById(device.id, device.deviceTypeName);
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
        onDelete={() =>
          devicesStore.confirmDeleteDevice(device.id, device.deviceTypeName)
        }
        onEdit={() => devicesStore.startEdit(device.id, device.deviceTypeName)}
        onUpdate={params =>
          devicesStore.upsertDeviceGUI(device.id, device.deviceTypeName, params)
        }
      />
    );
  }

  render() {
    const { devices } = this.props.devicesStore;
    return (
      <div className="device-dom-canvas">
        {devices.map(d => this.renderDevice(d))}
        <NonDevice
          title="Discharge"
          icon="arrow-circle-down"
          width={100}
          height={50}
          x={1200}
          y={100}
          shortKey="F2"
        />
      </div>
    );
  }
}

export default DeviceDOMCanvas;
