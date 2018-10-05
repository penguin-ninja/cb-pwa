import React, { Component } from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import Modal from 'react-bootstrap/lib/Modal';
import Alert from 'react-bootstrap/lib/Alert';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import startCase from 'lodash/startCase';
import omit from 'lodash/omit';
import LoadingButton from 'app/components/LoadingButton/LoadingButton';
import * as DEVICE_MODELS from 'app/constants/DeviceModels';
import { DEFAULT_ENUM } from 'app/constants/BatchTypeEnums';

@inject('devicesStore')
@observer
class EditDevice extends Component {
  constructor(props) {
    super(props);

    const {
      editingDevice,
      editingDeviceId,
      editingDeviceTypeName: deviceType
    } = this.props.devicesStore;
    const model = DEVICE_MODELS[deviceType];

    if (!model) {
      throw new Error(`device model for ${deviceType} not found!`);
    }

    this.state = {
      model: {
        id: {
          type: 'number',
          disabled: true
        },
        linkId: {
          type: 'number',
          disabled: true
        },
        description: {
          type: 'text',
          col: 12
        },
        ...model
      },
      deviceType,
      error: null
    };

    if (editingDevice) {
      this.state = {
        ...this.state,
        id: editingDeviceId,
        isEditing: true,
        device: toJS(editingDevice)
      };
    } else {
      this.state = {
        ...this.state,
        id: null,
        isEditing: false,
        device: {}
      };
    }
  }

  onChange = fieldName => event => {
    this.setState({
      device: {
        ...this.state.device,
        [fieldName]: event.target.value
      }
    });
  };

  onSave = () => {
    const { device, isEditing, id, deviceType } = this.state;
    const { devicesStore } = this.props;
    let promise;
    const payload = omit(device, ['id', 'linkId']);

    this.setState({ error: null, saving: true });

    if (isEditing) {
      promise = devicesStore.updateDevice(id, deviceType, payload);
    } else {
      promise = devicesStore.createDevice(deviceType, payload);
    }

    return promise
      .then(() => {
        devicesStore.cancelEdit();
      })
      .catch(e => {
        this.setState({ error: e.message, saving: false });
      });
  };

  getFieldConfig = fieldName => {
    const fieldConfig = this.state.model[fieldName];

    if (typeof fieldConfig === 'string') {
      return {
        type: fieldConfig,
        col: 6,
        disabled: false
      };
    }

    return {
      col: 6,
      disabled: false,
      ...fieldConfig
    };
  };

  renderField(name, config, value) {
    const { devicesStore } = this.props;
    const { type, disabled } = config;

    switch (type) {
      case 'number':
      case 'text':
        return (
          <FormControl
            name={name}
            type={type}
            value={value}
            disabled={disabled}
            onChange={this.onChange(name)}
          />
        );
      default:
        const options = devicesStore[type] || DEFAULT_ENUM;
        return (
          <FormControl
            name={name}
            value={value}
            onChange={this.onChange(name)}
            componentClass="select"
            disabled={disabled}
          >
            <option value="">- Select -</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </FormControl>
        );
    }
  }

  renderForm() {
    const { error, device, model } = this.state;
    return (
      <Form>
        {!!error && <Alert bsStyle="danger">{error}</Alert>}
        <Row>
          {Object.keys(model).map(fieldName => {
            const fieldType = this.getFieldConfig(fieldName);

            return (
              <Col sm={fieldType.col} key={fieldName}>
                <FormGroup>
                  <ControlLabel>{startCase(fieldName)}</ControlLabel>
                  {this.renderField(fieldName, fieldType, device[fieldName])}
                </FormGroup>
              </Col>
            );
          })}
        </Row>
      </Form>
    );
  }

  render() {
    const { editingDeviceTypeName, cancelEdit } = this.props.devicesStore;
    const { id, isEditing, saving } = this.state;

    return (
      <Modal show onHide={cancelEdit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? 'Edit' : 'New'} {editingDeviceTypeName}{' '}
            {id ? `#${id}` : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.renderForm()}</Modal.Body>
        <Modal.Footer>
          <Button onClick={cancelEdit}>Cancel</Button>
          &nbsp;&nbsp;
          <LoadingButton
            bsStyle="primary"
            onClick={this.onSave}
            label="Save"
            loadingLabel="Saving"
            isLoading={saving}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditDevice;
