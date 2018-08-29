import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import './Diagnose.css';

// @TODO handle button styles
@inject('diagnoseStore')
@observer
class Diagnose extends Component {
  renderInputs() {
    const buttons = [];
    for (let i = 1; i <= 96; i++) {
      buttons.push(
        <Button
          key={`input_${i}`}
          className="btn-diagnose-input"
          bsSize="xs"
          // bsStyle="success"
        >
          {i}
        </Button>
      );

      if (i % 16 === 0) {
        buttons.push(<br key={`input_br_${i}`} />);
      }
    }

    return (
      <div className="diagnose-inputs">
        <h4>Inputs</h4>
        <div className="form-group">{buttons}</div>
        <div className="form-group">
          <Button bsSize="sm" className="btn-diagnose-test default">
            All Inputs On
          </Button>
          <Button bsSize="sm" className="btn-diagnose-test default">
            All Inputs Off
          </Button>
          <Button bsSize="sm" className="btn-diagnose-test default">
            Auto Test
          </Button>
        </div>
        <hr />
      </div>
    );
  }

  renderOutputs() {
    const buttons = [];
    for (let i = 1; i <= 48; i++) {
      buttons.push(
        <Button
          key={`outputs_${i}`}
          className="btn-diagnose-output"
          bsSize="xs"
          // bsStyle="danger"
        >
          {i}
        </Button>
      );

      if (i % 16 === 0) {
        buttons.push(<br key={`output_br_${i}`} />);
      }
    }

    return (
      <div className="diagnose-outputs">
        <h4>Outputs</h4>
        <div className="form-group">{buttons}</div>
        <div className="form-group">
          <Button bsSize="sm" className="btn-diagnose-test default">
            All Outputs On
          </Button>
          <Button bsSize="sm" className="btn-diagnose-test default">
            All Outputs Off
          </Button>
          <Button bsSize="sm" className="btn-diagnose-test default">
            Auto Test
          </Button>
        </div>
      </div>
    );
  }

  render() {
    const { diagnoseStore } = this.props;
    const { showModal, onHide } = diagnoseStore;

    return (
      <Modal show={showModal} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Diagnose</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderInputs()}
          {this.renderOutputs()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Diagnose;
