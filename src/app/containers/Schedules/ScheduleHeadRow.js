import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class ScheduleHeadRow extends Component {
  render() {
    return (
      <div className="schedule-row schedule-row--head">
        <div className="schedule-row__body">
          <Row>
            <Col sm={2}>
              <span>&nbsp;</span>
              <b>Quantity</b>
              <b>Truck No.</b>
            </Col>
            <Col sm={3}>
              <span>Date</span>
              <b>Mix Code</b>
              <span>Extra prod</span>
            </Col>
            <Col sm={3}>
              <span>Ticket Time</span>
              <b>Slump</b>
              <span>Tkt code</span>
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
      </div>
    );
  }
}

export default ScheduleHeadRow;
