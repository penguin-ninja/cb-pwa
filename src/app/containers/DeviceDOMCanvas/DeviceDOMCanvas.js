import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Device from 'app/components/DeviceAsDom';
import NonDevice from 'app/components/NonDevice/NonDevice';
import NON_DEVICES from 'app/constants/NonDevices';
import './DeviceDOMCanvas.css';

@inject('devicesStore', 'batchStore')
@observer
class DeviceDOMCanvas extends Component {
  onUpdateNonDevice = (id, params) => {
    return this.props.devicesStore.upsertNonDeviceGUI(id, params);
  };

  handleNonDeviceClick = id => {
    const { batchStore } = this.props;
    switch (id) {
      case 'demo':
        batchStore.start();
        break;
      case 'abort':
        batchStore.stop();
        break;
      default:
    }
  };

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

  renderNonDevice(nonDevice) {
    const { devicesStore } = this.props;
    const gui = devicesStore.getNonDeviceGUIById(nonDevice.id);

    return (
      <NonDevice
        key={`non-device-${nonDevice.id}`}
        title={nonDevice.title}
        icon={nonDevice.icon}
        shortKey={nonDevice.shortKey}
        x={gui.x}
        y={gui.y}
        z={gui.z}
        width={gui.length}
        height={gui.size}
        onUpdate={params =>
          this.props.devicesStore.upsertNonDeviceGUI(nonDevice.id, params)
        }
        onClick={() => this.handleNonDeviceClick(nonDevice.id)}
      />
    );
  }

  render() {
    const { devices, guiLoaded } = this.props.devicesStore;

    if (!guiLoaded) return null;

    return (
      <div className="device-dom-canvas">
        {devices.map(d => this.renderDevice(d))}
        {NON_DEVICES.map(d => this.renderNonDevice(d))}
      </div>
    );
  }
}

export default DeviceDOMCanvas;
