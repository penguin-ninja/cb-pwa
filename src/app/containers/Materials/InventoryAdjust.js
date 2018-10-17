import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Well from 'react-bootstrap/lib/Well';
import Form from 'react-bootstrap/lib/Form';
import Alert from 'react-bootstrap/lib/Alert';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import LoadingButton from 'app/components/LoadingButton/LoadingButton';
import Time from 'app/components/Time/Time';

// @TODO replace current user
@inject('materialStore')
@observer
class InventoryAdjust extends Component {
  constructor() {
    super();
    this.state = {
      adjustedQuantity: 0,
      reason: '',
      comment: '',
      error: null,
      saving: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.materialId &&
      nextProps.materialId !== this.props.materialId
    ) {
      this.setState({
        adjustedQuantity: this.props.materialStore.getMaterialById(
          nextProps.materialId
        ).currentBalance
      });
    }
  }

  onChange = field => evt => {
    this.setState({ [field]: evt.target.value });
  };

  onAdjust = () => {
    const { materialId, materialStore } = this.props;
    const { adjustedQuantity, reason, comment } = this.state;
    const { currentBalance } = materialStore.getMaterialById(materialId);

    this.setState({ saving: true });

    materialStore
      .adjustQuantity(materialId, {
        quantity: adjustedQuantity - currentBalance, // sends over only added up amount
        reason,
        comment
      })
      .then(() => {
        this.onCloseModal();
      })
      .catch(e => {
        this.setState({ error: e.message, saving: false });
      });
  };

  onCloseModal = () => {
    this.setState({
      adjustedQuantity: 0,
      reason: '',
      comment: '',
      error: null,
      saving: false
    });
    this.props.onCloseModal();
  };

  render() {
    const { materialId } = this.props;
    const { saving, adjustedQuantity, reason, comment, error } = this.state;
    const material = this.props.materialStore.getMaterialById(materialId);

    return (
      <Modal show={!!materialId} onHide={this.onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Inventory Adjust ({material && material.name})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Well>
            <div>
              <b>Current Quantity: </b> {material && material.currentBalance}{' '}
              {material && material.assignment === 'Weighed' ? 'TON' : 'GL'}
            </div>
            <div>
              <b>Time: </b> <Time />
            </div>
            <div>
              <b>Current User: </b> mike@staging
            </div>
          </Well>
          <Form onSubmit={e => e.preventDefault()}>
            <FormGroup>
              <ControlLabel>Adjusted Quantity</ControlLabel>
              <FormControl
                name="adjusted_quantity"
                type="number"
                value={adjustedQuantity}
                onChange={this.onChange('adjustedQuantity')}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Reason</ControlLabel>
              <FormControl
                name="reason"
                type="text"
                value={reason}
                onChange={this.onChange('reason')}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Comment</ControlLabel>
              <FormControl
                name="comment"
                componentClass="textarea"
                type="text"
                value={comment}
                onChange={this.onChange('comment')}
              />
            </FormGroup>
          </Form>
          {!!error && <Alert bsStyle="danger">{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onCloseModal}>Close</Button>
          &nbsp;&nbsp;
          <LoadingButton
            bsStyle="primary"
            onClick={this.onAdjust}
            label="Save"
            loadingLabel="Saving"
            isLoading={saving}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default InventoryAdjust;
