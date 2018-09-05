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
    const { diagnoseStore } = this.props;
    const { inputs } = diagnoseStore;

    for (let i = 1; i <= 48; i++) {
      const value = inputs[i - 1];

      buttons.push(
        <Button
          key={`input_${i}`}
          className="btn-diagnose-input"
          bsSize="xs"
          bsStyle={value === '1' ? 'success' : undefined}
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
        <hr />
      </div>
    );
  }

  renderOutputs() {
    const buttons = [];
    const { diagnoseStore } = this.props;
    const { outputs } = diagnoseStore;

    for (let i = 1; i <= 96; i++) {
      const value = outputs[i - 1];

      buttons.push(
        <Button
          key={`outputs_${i}`}
          className="btn-diagnose-output"
          bsSize="xs"
          bsStyle={value === '1' ? 'danger' : undefined}
          onClick={() => diagnoseStore.setOutput(i, value === '1' ? '0' : '1')}
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
          <Button
            bsSize="sm"
            className="btn-diagnose-test default"
            onClick={() => diagnoseStore.setAllOutputs('1')}
          >
            All Outputs On
          </Button>
          <Button
            bsSize="sm"
            className="btn-diagnose-test default"
            onClick={() => diagnoseStore.setAllOutputs('0')}
          >
            All Outputs Off
          </Button>
          {diagnoseStore.isTesting ? (
            <Button
              bsSize="sm"
              className="btn-diagnose-test default"
              onClick={diagnoseStore.stopOutputTest}
            >
              Stop Test
            </Button>
          ) : (
            <Button
              bsSize="sm"
              className="btn-diagnose-test default"
              onClick={diagnoseStore.startOutputTest}
            >
              Auto Test
            </Button>
          )}
        </div>
        <hr />
      </div>
    );
  }

  renderChannels() {
    const buttons = [];
    const { diagnoseStore } = this.props;
    const { channels } = diagnoseStore;

    for (let i = 1; i <= 16; i++) {
      buttons.push(
        <Button
          key={`channels_${i}`}
          className="btn-diagnose-channel"
          bsSize="xs"
          // bsStyle="danger"
        >
          {channels[i - 1]}
        </Button>
      );

      if (i % 8 === 0) {
        buttons.push(<br key={`channel_br_${i}`} />);
      }
    }

    return (
      <div className="diagnose-channels">
        <h4>Channels</h4>
        <div className="form-group">{buttons}</div>
      </div>
    );
  }

  render() {
    const { diagnoseStore } = this.props;
    const { showModal, onHide, ticks } = diagnoseStore;

    return (
      <Modal show={showModal} onHide={onHide} bsSize="lg">
        <Modal.Header closeButton>
          <Modal.Title>Diagnose <small>(ticks - {ticks})</small></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderInputs()}
          {this.renderOutputs()}
          {this.renderChannels()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Diagnose;
