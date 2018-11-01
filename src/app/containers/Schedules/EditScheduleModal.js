import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Alert from 'react-bootstrap/lib/Alert';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import DateTimePicker from 'react-datetime';
import { ScheduleModel, MixModel } from 'app/constants/ScheduleModel';
import LoadingButton from 'app/components/LoadingButton/LoadingButton';
import startCase from 'lodash/startCase';

const MAX_MIX_COUNT = 6;
const MAX_SHIP_COUNT = 3;
const MAX_SOLD_COUNT = 3;

@inject('scheduleStore')
@observer
class EditScheduleModal extends Component {
  constructor(props) {
    super(props);

    const { scheduleStore } = props;
    const { editingScheduleId } = scheduleStore;
    const schedule =
      editingScheduleId === 'new'
        ? {}
        : scheduleStore.getScheduleById(editingScheduleId);

    this.state = {
      scheduleId: editingScheduleId,
      isEditing: editingScheduleId !== 'new',
      values: {
        ...schedule
      },
      soldCount: 1,
      shipCount: 1,
      mixCount: 1,
      isSaving: false,
      error: null
    };
  }

  increaseCount = (fieldName, maxCount) => () => {
    this.setState({
      [fieldName]: Math.min(this.state[fieldName] + 1, maxCount)
    });
  };

  onChangeDate = fieldName => value => this.setState({ [fieldName]: value });

  onChange = fieldName => e => {
    this.setState({
      values: {
        ...this.state.values,
        [fieldName]: e.target.value
      }
    });
  };

  onChangeCheckbox = fieldName => e => {
    this.setState({
      values: {
        ...this.state.values,
        [fieldName]: e.target.checked
      }
    });
  };

  getFieldConfig = (fieldName, fieldConfig) => {
    if (typeof fieldConfig === 'string') {
      return {
        label: startCase(fieldName),
        placeholder: startCase(fieldName),
        type: fieldConfig,
        col: 4,
        disabled: false
      };
    }

    return {
      label: startCase(fieldName),
      placeholder: fieldConfig.placeholder || startCase(fieldName),
      col: 4,
      disabled: false,
      ...fieldConfig
    };
  };

  renderField(name, value, config) {
    const { placeholder, type, disabled, options, label } = config;

    switch (type) {
      case 'date':
        return (
          <DateTimePicker
            inputProps={{ className: 'form-control input-sm', placeholder }}
            onChange={this.onChangeDate(name)}
            value={value}
            timeFormat={false}
          />
        );
      case 'time':
        return (
          <DateTimePicker
            inputProps={{ className: 'form-control input-sm', placeholder }}
            onChange={this.onChangeDate(name)}
            value={value}
            dateFormat={false}
          />
        );
      case 'number':
      case 'text':
        return (
          <FormControl
            name={name}
            type={type}
            value={value || ''}
            disabled={disabled}
            onChange={this.onChange(name)}
            bsSize="sm"
            placeholder={placeholder}
          />
        );
      case 'boolean':
        return (
          <Checkbox
            inline
            checked={!!value}
            onChange={this.onChangeCheckbox(name)}
          >
            {placeholder}
          </Checkbox>
        );
      default:
        return (
          <FormControl
            name={name}
            componentClass="select"
            disabled={disabled}
            value={value}
            onChange={this.onChange(name)}
            bsSize="sm"
          >
            <option value="">{placeholder || `Select ${label}`}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.name || option.text}
              </option>
            ))}
          </FormControl>
        );
    }
  }

  renderModel(model) {
    return Object.keys(model).map(fieldName => {
      const config = this.getFieldConfig(fieldName, model[fieldName]);

      return (
        <Col sm={config.col} key={fieldName}>
          <FormGroup>
            {this.renderField(fieldName, this.state.values[fieldName], config)}
          </FormGroup>
        </Col>
      );
    });
  }

  renderSoldTo() {
    const { soldCount } = this.state;
    return (
      <Panel>
        <Panel.Heading>
          Sold To{' '}
          <Button
            role="button"
            bsSize="xs"
            bsStyle="success"
            className="pull-right"
            onClick={this.increaseCount('soldCount', MAX_SOLD_COUNT)}
          >
            +
          </Button>
        </Panel.Heading>
        <Panel.Body>
          <Row>
            {Array(soldCount)
              .fill('')
              .map((_1, index) => (
                <Col key={`soldTo${index + 1}`} sm={12}>
                  <FormGroup>
                    {this.renderField(
                      `soldTo${index + 1}`,
                      this.state.values[`soldTo${index + 1}`],
                      {
                        type: 'text',
                        placeholder: `Sold To ${index + 1}`
                      }
                    )}
                  </FormGroup>
                </Col>
              ))}
          </Row>
        </Panel.Body>
      </Panel>
    );
  }

  renderShipTo() {
    const { shipCount } = this.state;
    return (
      <Panel>
        <Panel.Heading>
          Ship To{' '}
          <Button
            role="button"
            bsSize="xs"
            bsStyle="success"
            className="pull-right"
            onClick={this.increaseCount('shipCount', MAX_SHIP_COUNT)}
          >
            +
          </Button>
        </Panel.Heading>
        <Panel.Body>
          <Row>
            {Array(shipCount)
              .fill('')
              .map((_1, index) => (
                <Col key={`shipTo${index}`} sm={12}>
                  <FormGroup>
                    {this.renderField(
                      `shipTo${index + 1}`,
                      this.state.values[`shipTo${index + 1}`],
                      {
                        type: 'text',
                        placeholder: `Ship To ${index + 1}`
                      }
                    )}
                  </FormGroup>
                </Col>
              ))}
          </Row>
        </Panel.Body>
      </Panel>
    );
  }

  renderMixItem(index) {
    return Object.keys(MixModel).map(fieldName => {
      const temp = {
        ...this.getFieldConfig(fieldName, MixModel[fieldName])
      };
      const name = `${fieldName}${index + 1}`;
      const config = {
        ...temp,
        placeholder: `${temp.label} ${index + 1}`
      };

      return (
        <Col sm={config.col} key={name}>
          <FormGroup>
            {this.renderField(name, this.state.values[name], config)}
          </FormGroup>
        </Col>
      );
    });
  }

  renderMix() {
    const { mixCount } = this.state;
    return (
      <Panel>
        <Panel.Heading>
          Mix{' '}
          <Button
            role="button"
            bsSize="xs"
            bsStyle="success"
            className="pull-right"
            onClick={this.increaseCount('mixCount', MAX_MIX_COUNT)}
          >
            +
          </Button>
        </Panel.Heading>
        <Panel.Body>
          {Array(mixCount)
            .fill('')
            .map((_1, index) => (
              <Row key={`mix${index}`}>{this.renderMixItem(index)}</Row>
            ))}
        </Panel.Body>
      </Panel>
    );
  }

  renderForm() {
    const { error } = this.state;

    return (
      <Form onSubmit={e => e.preventDefault()}>
        {!!error && <Alert bsStyle="danger">{error}</Alert>}
        <Row>
          <Col sm={12}>
            <Panel>
              <Panel.Heading>Basic Info</Panel.Heading>
              <Panel.Body>
                <Row>{this.renderModel(ScheduleModel)}</Row>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>{this.renderSoldTo()}</Col>
          <Col sm={6}>{this.renderShipTo()}</Col>
        </Row>
        <Row>
          <Col sm={12}>{this.renderMix()}</Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { onClose } = this.props.scheduleStore;
    const { isEditing, isSaving } = this.state;

    return (
      <Modal show onHide={onClose} dialogClassName="big-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? 'Edit Schedule' : 'New Schedule'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.renderForm()}</Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Cancel</Button>
          &nbsp;&nbsp;
          <LoadingButton
            bsStyle="primary"
            onClick={this.onSave}
            label="Save"
            loadingLabel="Saving"
            isLoading={isSaving}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditScheduleModal;
