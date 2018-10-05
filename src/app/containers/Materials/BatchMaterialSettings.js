import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Alert from 'react-bootstrap/lib/Alert';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import MaterialModels from 'app/constants/MaterialModels';
import LoadingButton from 'app/components/LoadingButton/LoadingButton';
import startCase from 'lodash/startCase';
import './BatchMaterialSettings.css';

@inject('materialStore', 'jogStore', 'cutoffStore')
@observer
class BatchMaterialSettingsModal extends Component {
  constructor() {
    super();
    this.state = {
      values: {},
      error: null,
      loading: true,
      saving: false,
      unassigning: false
    };
  }

  componentWillMount() {
    const { materialStore, editingMaterial } = this.props;
    if (editingMaterial.assignment !== 'None') {
      materialStore.loadMaterialDetail(editingMaterial.id).then(values => {
        this.setState({
          values,
          loading: false
        });
      });
    } else {
      this.setState({
        values: {
          assignment: editingMaterial.assignment
        },
        loading: false
      });
    }
  }

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

  onSubmit = e => {
    const { values } = this.state;
    const { editingMaterial, materialStore, cancelEdit } = this.props;
    let promise = Promise.resolve();

    e.preventDefault();
    this.setState({ saving: true });

    if (editingMaterial.assignment === 'None') {
      promise = materialStore.assignMaterial(
        editingMaterial.id,
        values.assignment
      );
    } else {
      promise = materialStore.saveMaterialDetail(editingMaterial, values);
    }

    promise
      .then(() => {
        cancelEdit();
      })
      .catch(err => {
        this.setState({ error: err.message, saving: false });
      });
  };

  unassign = () => {
    const { editingMaterial, materialStore, cancelEdit } = this.props;

    this.setState({ unassigning: true });
    materialStore
      .unassignMaterial(editingMaterial.id)
      .then(() => {
        cancelEdit();
      })
      .catch(err => {
        this.setState({ error: err.message, unassigning: false });
      });
  };

  renderField(name, value, config) {
    const { type, disabled, options } = config;

    switch (type) {
      case 'number':
      case 'text':
        return (
          <FormControl
            name={name}
            type={type}
            value={value || ''}
            disabled={disabled}
            onChange={this.onChange(name)}
          />
        );
      case 'boolean':
        return (
          <Checkbox
            inline
            checked={value}
            onChange={this.onChangeCheckbox(name)}
          />
        );
      default:
        return (
          <FormControl
            name={name}
            componentClass="select"
            disabled={disabled}
            value={value}
            onChange={this.onChange(name)}
          >
            <option value="">- Select -</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.name || option.text}
              </option>
            ))}
          </FormControl>
        );
    }
  }

  renderActionButton(name) {
    const { jogStore, cutoffStore, editingMaterial } = this.props;
    switch (name) {
      case 'autoCutOff':
        return (
          <Button
            className="btn-material-action default"
            type="button"
            onClick={() => cutoffStore.onShowModal(editingMaterial.id)}
          >
            Free Fall Table
          </Button>
        );
      case 'autoJog':
        return (
          <Button
            className="btn-material-action default"
            type="button"
            onClick={() => jogStore.onShowModal(editingMaterial.id)}
          >
            Jog Table
          </Button>
        );
      default:
        return null;
    }
  }

  renderForm() {
    const { editingMaterial, materialStore, cancelEdit } = this.props;
    const { loading, saving, unassigning, error, values } = this.state;
    const model = MaterialModels[editingMaterial.assignment];

    if (loading) {
      return (
        <h5 className="text-center">
          <i className="fa fa-circle-o-notch fa-spin" /> Loading...
        </h5>
      );
    }

    return (
      <Form onSubmit={this.onSubmit}>
        <Row>
          {Object.keys(model).map(fieldName => {
            const type = model[fieldName];

            return (
              <Col sm={6} key={fieldName}>
                <ControlLabel>{startCase(fieldName)}</ControlLabel>
                {this.renderField(fieldName, values[fieldName], {
                  disabled: saving,
                  type,
                  options: materialStore[type]
                })}
                {this.renderActionButton(fieldName)}
              </Col>
            );
          })}
        </Row>
        {!!error && <Alert bsStyle="danger">{error}</Alert>}
        <Row className="material-edit-actions">
          <Col sm={12} className="text-right">
            {editingMaterial.assignment !== 'None' && (
              <LoadingButton
                bsStyle="danger"
                className="pull-left"
                type="button"
                label="Unassign"
                loadingLabel="Unassigning"
                onClick={this.unassign}
                isLoading={unassigning}
              />
            )}

            <Button type="button" onClick={cancelEdit}>
              Close
            </Button>

            <LoadingButton
              bsStyle="primary"
              type="submit"
              label="Save"
              loadingLabel="Saving"
              isLoading={saving}
            />
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { editingMaterial, cancelEdit } = this.props;
    const { assignment, name } = editingMaterial;

    return (
      <Modal
        show={!!editingMaterial}
        onHide={cancelEdit}
        className="batch-material-settings-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {assignment === 'None' ? 'Unassigned' : assignment} Material -{' '}
            {name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.renderForm()}</Modal.Body>
      </Modal>
    );
  }
}

export default BatchMaterialSettingsModal;
