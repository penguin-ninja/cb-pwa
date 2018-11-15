import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import shortid from 'shortid';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

@inject('materialStore', 'mixStore')
@observer
class AddMaterialModal extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      values: [
        {
          id: shortid.generate(),
          materialId: ''
        }
      ]
    };
  };

  addRow = () => {
    this.setState({
      values: [
        ...this.state.values,
        {
          id: shortid.generate(),
          materialId: ''
        }
      ]
    });
  };

  deleteRow = id => {
    this.setState({
      values: this.state.values.filter(v => v.id !== id)
    });
  };

  onChange = (id, field) => e => {
    const index = this.state.values.findIndex(v => v.id === id);
    this.setState({
      values: [
        ...this.state.values.slice(0, index),
        {
          ...this.state.values[index],
          [field]: e.target.value
        },
        ...this.state.values.slice(index + 1)
      ]
    });
  };

  onSave = () => {
    this.props.mixStore.removeMaterials(this.state.values);
    this.onHide();
  };

  onHide = () => {
    this.setState(this.getInitialState());
    this.props.onHide();
  };

  renderRow = (id, value) => {
    const { materials } = this.props.materialStore;
    return (
      <Row key={id}>
        <Col sm={8}>
          <FormGroup>
            <ControlLabel>Material</ControlLabel>
            <FormControl
              name={`material_${id}`}
              value={value.materialId}
              onChange={this.onChange(id, 'materialId')}
              componentClass="select"
            >
              <option value="">- Select -</option>
              {materials.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </FormControl>
          </FormGroup>
        </Col>
        <Col sm={4}>
          <Button
            bsSize="sm"
            onClick={() => this.deleteRow(id)}
            bsStyle="danger"
            className="mix-material-delete-btn"
          >
            Remove
          </Button>
        </Col>
      </Row>
    );
  };

  renderForm() {
    return (
      <Form onSubmit={this.onSave}>
        {this.state.values.map(row => this.renderRow(row.id, row))}
      </Form>
    );
  }

  render() {
    const { showModal } = this.props;

    return (
      <Modal show={showModal} onHide={this.onHide} bsSize="lg">
        <Modal.Header closeButton>
          <Modal.Title>Remove Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderForm()}
          <Row>
            <Col sm={12}>
              <Button bsSize="sm" onClick={this.addRow} bsStyle="success">
                + Add Row
              </Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onHide}>Close</Button>
          &nbsp;&nbsp;
          <Button bsStyle="primary" onClick={this.onSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddMaterialModal;
