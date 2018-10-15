import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Well from 'react-bootstrap/lib/Well';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import DateTimePicker from 'react-datetime';
import Alert from 'react-bootstrap/lib/Alert';
import LoadingButton from 'app/components/LoadingButton/LoadingButton';
import Time from 'app/components/Time/Time';
import moment from 'moment';

// @TODO replace current user
@inject('shipHistoryStore')
@observer
class InventoryAdjust extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
      supplier: '',
      truck: '',
      hauler: '',
      ticket: '',
      comment: '',
      deliveryTime: moment().toDate(),
      error: null,
      saving: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.shipHistoryStore.isShipInVisible &&
      nextProps.shipHistoryStore.isShipInVisible !==
        this.props.shipHistoryStore.isShipInVisible
    ) {
      this.setState({
        deliveryTime: moment().toDate()
      });
    }
  }

  onChange = field => evt => {
    this.setState({ [field]: evt.target.value });
  };

  onChangeDate = deliveryTime => this.setState({ deliveryTime });

  onShipIn = () => {
    // @TODO supplier, truck, hauler, ticket
    const { materialId, shipHistoryStore } = this.props;
    const { quantity, deliveryTime, comment } = this.state;

    this.setState({ saving: true });

    shipHistoryStore
      .shipIn(materialId, {
        quantity,
        changeDate: moment(deliveryTime).format(),
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
      quantity: 0,
      supplier: '',
      truck: '',
      hauler: '',
      ticket: '',
      comment: '',
      deliveryTime: moment().toDate(),
      error: null,
      saving: false
    });
    this.props.shipHistoryStore.onCloseShipIn();
  };

  render() {
    const {
      saving,
      quantity,
      supplier,
      hauler,
      ticket,
      truck,
      comment,
      deliveryTime,
      error
    } = this.state;
    const { material, isShipInVisible } = this.props.shipHistoryStore;

    return (
      <Modal show={isShipInVisible} onHide={this.onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ship In ({material && material.name})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Well>
            <div>
              <b>Current Quantity: </b> {material && material.currentBalance}{' '}
              {material && material.assignment === 'Weighed' ? 'TON' : 'GL'}
            </div>
            <div>
              <b>Current Time: </b> <Time />
            </div>
          </Well>
          <Form onSubmit={e => e.preventDefault()}>
            <FormGroup>
              <ControlLabel>Quantity</ControlLabel>
              <FormControl
                name="quantity"
                type="number"
                value={quantity}
                onChange={this.onChange('quantity')}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Delivery Time</ControlLabel>
              <DateTimePicker
                inputProps={{ className: 'form-control' }}
                onChange={this.onChangeDate}
                value={deliveryTime}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Supplier</ControlLabel>
              <FormControl
                name="supplier"
                type="text"
                value={supplier}
                onChange={this.onChange('supplier')}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Truck</ControlLabel>
              <FormControl
                name="truck"
                type="text"
                value={truck}
                onChange={this.onChange('truck')}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Hauler</ControlLabel>
              <FormControl
                name="hauler"
                type="text"
                value={hauler}
                onChange={this.onChange('hauler')}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Ticket</ControlLabel>
              <FormControl
                name="ticket"
                type="text"
                value={ticket}
                onChange={this.onChange('ticket')}
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
            onClick={this.onShipIn}
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
