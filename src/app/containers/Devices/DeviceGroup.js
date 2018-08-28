import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from 'react-bootstrap/lib/Panel';
import Table from 'react-bootstrap/lib/Table';
import { confirm } from 'app/utils/modals';

class DeviceGroup extends Component {
  deleteDevice = deviceId => {
    const { deviceTypeName, onDelete } = this.props;
    confirm({
      title: `Are you sure you want to delete ${deviceTypeName} #${deviceId}?`,
      okLabel: 'Yes',
      cancelLabel: 'No'
    })
      .then(() => {
        return onDelete(deviceId, deviceTypeName);
      })
      .catch(() => {});
  };

  newDevice = () => {
    const { deviceTypeName, onEdit } = this.props;
    onEdit(null, deviceTypeName);
  };

  editDevice = deviceId => {
    const { deviceTypeName, onEdit } = this.props;
    onEdit(deviceId, deviceTypeName);
  };

  renderDevice(device) {
    return (
      <tr key={device.id}>
        <td>{device.id}</td>
        <td>{device.description}</td>
        <td>
          <a onClick={() => this.editDevice(device.id)}>Edit</a> |{' '}
          <a onClick={() => this.deleteDevice(device.id)}>Delete</a>
        </td>
      </tr>
    );
  }

  render() {
    const { deviceTypeName, devices } = this.props;

    return (
      <Panel eventKey={deviceTypeName}>
        <Panel.Heading>
          <Panel.Title toggle>{deviceTypeName}</Panel.Title>
          <a className="btn-devices-add" onClick={this.newDevice}>
            <i className="fa fa-plus" />
          </a>
        </Panel.Heading>
        <Panel.Body collapsible>
          {devices.length ? (
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{devices.map(d => this.renderDevice(d))}</tbody>
            </Table>
          ) : (
            <p className="text-center">
              No {deviceTypeName} added yet.{' '}
              <a onClick={this.newDevice}>Click here</a> to add a{' '}
              {deviceTypeName}.
            </p>
          )}
        </Panel.Body>
      </Panel>
    );
  }
}

DeviceGroup.propTypes = {
  deviceTypeName: PropTypes.string.isRequired,
  devices: PropTypes.array.isRequired
};

export default DeviceGroup;
