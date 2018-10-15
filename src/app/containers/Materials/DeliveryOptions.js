import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import ReactTable from 'react-table';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import DateTimePicker from 'react-datetime';
import './DeliveryOptions.css';

@inject('shipHistoryStore')
@observer
class DeliveryOptions extends Component {
  constructor() {
    super();
    this.state = {
      sorted: []
    };
  }

  getSortHeaderProps = () => {
    return {
      Header: props => {
        const sortInfo = this.state.sorted.filter(
          item => item.id === props.column.id
        );
        let icon = '';

        if (sortInfo.length) {
          if (sortInfo[0].desc) {
            icon = 'fa fa-caret-down';
          } else {
            icon = 'fa fa-caret-up';
          }
        }

        return (
          <span>
            {props.column.headerText}
            {icon && <i className={icon} />}
          </span>
        );
      }
    };
  };

  getColumns = () => {
    return [
      {
        headerText: 'Date',
        accessor: d => d,
        width: 170,
        id: 'changeDate',
        Cell: this.renderDate,
        ...this.getSortHeaderProps()
      },
      {
        headerText: 'Material',
        accessor: d => d,
        id: 'material',
        ...this.getSortHeaderProps(),
        Cell: this.renderMaterial
      },
      {
        headerText: 'Ticket',
        accessor: 'ticket',
        id: 'ticket',
        ...this.getSortHeaderProps()
      },
      {
        headerText: 'Quantity',
        accessor: d => d,
        id: 'quantityChange',
        ...this.getSortHeaderProps(),
        Cell: this.renderQuantity
      },
      {
        headerText: 'Supplier',
        accessor: 'supplier',
        id: 'supplier',
        ...this.getSortHeaderProps()
      },
      {
        headerText: 'Truck',
        accessor: 'truck',
        id: 'truck',
        ...this.getSortHeaderProps()
      },
      {
        headerText: 'Hauler',
        accessor: 'hauler',
        id: 'hauler',
        ...this.getSortHeaderProps()
      },
      {
        headerText: 'Comment',
        accessor: 'comment',
        id: 'comment',
        ...this.getSortHeaderProps()
      }
    ];
  };

  renderMaterial = () => {
    const material = this.props.shipHistoryStore.material;

    return <span>{material && material.name}</span>;
  };

  renderDate = rowInfo => {
    return (
      <span>
        {moment(rowInfo.value.changeDate).format('MM/DD/YYYY hh:mm A')}
      </span>
    );
  };

  renderQuantity = rowInfo => {
    const material = this.props.shipHistoryStore.material;

    return (
      <span>
        {rowInfo.value.quantityChange}{' '}
        {material && material.assignment === 'Weighed' ? 'TON' : 'GL'}
      </span>
    );
  };

  render() {
    const {
      isModalVisible,
      historyItems,
      loading,
      onShipIn,
      onCloseModal,
      handleChangeFilter,
      dateFrom,
      dateTo
    } = this.props.shipHistoryStore;

    if (!isModalVisible) {
      return null;
    }

    return (
      <Modal
        show
        onHide={onCloseModal}
        dialogClassName="delivery-options-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delivery Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Well>
            <h4 className="filter-heading">Filter</h4>
            <Row>
              <Col sm={6}>
                <ControlLabel>Date From</ControlLabel>
                <DateTimePicker
                  inputProps={{ className: 'form-control' }}
                  onChange={value => handleChangeFilter('dateFrom', value)}
                  timeFormat={false}
                  value={dateFrom}
                />
              </Col>
              <Col sm={6}>
                <ControlLabel>Date To</ControlLabel>
                <DateTimePicker
                  inputProps={{ className: 'form-control' }}
                  onChange={value => handleChangeFilter('dateTo', value)}
                  timeFormat={false}
                  value={dateTo}
                />
              </Col>
            </Row>
          </Well>
          {loading ? (
            <h5 className="text-center">
              <i className="fa fa-circle-o-notch fa-spin" /> Loading...
            </h5>
          ) : (
            <ReactTable
              className="-highlight"
              data={historyItems}
              columns={this.getColumns()}
              sorted={this.state.sorted}
              onSortedChange={sorted => this.setState({ sorted })}
              showPaginationTop={false}
              showPaginationBottom={false}
              showPageSizeOptions={false}
              resizable={false}
              minRows={1}
              defaultPageSize={50}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className="pull-left" bsStyle="info" onClick={onShipIn}>
            Ship In
          </Button>
          <Button className="pull-left" bsStyle="danger" disabled>
            Delete All
          </Button>
          <Button onClick={onCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeliveryOptions;
