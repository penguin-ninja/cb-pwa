import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import SideBar from 'app/components/SideBar/SideBar';
import DeviceGroup from './DeviceGroup';
import EditDevice from './EditDevice';

import './Devices.css';

@inject('devicesStore')
@observer
class Devices extends Component {
  componentDidMount() {
    this.props.devicesStore.loadEnums();
    this.props.devicesStore.loadDevices();
    this.props.devicesStore.loadDeviceGUIs();
  }

  render() {
    const {
      devicesByType,
      isEditing,
      startEdit,
      confirmDeleteDevice
    } = this.props.devicesStore;

    return (
      <SideBar>
        <h3>
          <i className="fa fa-cog" /> Devices
        </h3>
        <PanelGroup accordion id="devices">
          {Object.keys(devicesByType).map(key => (
            <DeviceGroup
              key={key}
              devices={devicesByType[key]}
              deviceTypeName={key}
              onEdit={startEdit}
              onDelete={confirmDeleteDevice}
            />
          ))}
        </PanelGroup>

        {isEditing && <EditDevice />}
      </SideBar>
    );
  }
}

export default Devices;
