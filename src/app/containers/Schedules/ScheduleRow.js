import React, { Component } from 'react';
import moment from 'moment';
import cx from 'classnames';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';

class ScheduleRow extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  onToggleInfo = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { schedule } = this.props;
    return (
      <div className="schedule-row">
        <div className="schedule-row__body">
          <Row>
            <Col sm={2}>
              <span>&nbsp;</span>
              <b>Quantity</b>
              <b>Truck No.</b>
            </Col>
            <Col sm={3}>
              <span>{moment(schedule.shipDate).format('MM/DD/YYYY')}</span>
              <b>Mix Code</b>
              <span>Extra prod</span>
            </Col>
            <Col sm={3}>
              <span>Ticket Time</span>
              <b>Slump</b>
              <span>Ticket code</span>
            </Col>
            <Col sm={2}>
              <span>&nbsp;</span>
              <b>Trim</b>
            </Col>
            <Col sm={2}>
              <span>Prog Qty</span>
              <span>Tot Qty</span>
            </Col>
          </Row>
        </div>
        <Button
          className="schedule-row__info-btn"
          bsStyle="default"
          onClick={this.onToggleInfo}
        >
          <i
            className={cx('fa', {
              'fa-arrow-down': !this.state.show,
              'fa-arrow-up': this.state.show
            })}
          />
        </Button>
        <div
          className={cx('schedule-row__footer', {
            'schedule-row__footer--visible': this.state.show
          })}
        >
          <Row>
            <Col sm={6}>
              <span>Customer Name</span>
              <span>Project</span>
            </Col>
            <Col sm={6}>
              <span>Batch Note</span>
              <span>Delivery Address</span>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ScheduleRow;
