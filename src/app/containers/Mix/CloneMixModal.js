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

@inject('mixStore')
@observer
class CloneMixModal extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      values: [
        {
          id: shortid.generate(),
          mixId: '',
          code: ''
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
          mixId: '',
          code: ''
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
    this.props.mixStore.cloneMixes(this.state.values);
    this.onHide();
  };

  onHide = () => {
    this.setState(this.getInitialState());
    this.props.onHide();
  };

  renderRow = (id, value) => {
    const { mixes } = this.props.mixStore;
    return (
      <Row key={id}>
        <Col sm={5}>
          <FormGroup>
            <ControlLabel>Mix</ControlLabel>
            <FormControl
              name={`material_${id}`}
              value={value.mixId}
              onChange={this.onChange(id, 'mixId')}
              componentClass="select"
            >
              <option value="">- Select -</option>
              {mixes.map(option => (
                <option key={option.id} value={option.id}>
                  {option.code}
                </option>
              ))}
            </FormControl>
          </FormGroup>
        </Col>
        <Col sm={5}>
          <FormGroup>
            <ControlLabel>New Code</ControlLabel>
            <FormControl
              name={`code_${id}`}
              value={value.code}
              onChange={this.onChange(id, 'code')}
            />
          </FormGroup>
        </Col>
        <Col sm={2}>
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
          <Modal.Title>Save New Copy As</Modal.Title>
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

export default CloneMixModal;
