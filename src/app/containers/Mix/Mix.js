import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import MixTable from './MixTable';
import MixMaterialTable from './MixMaterialTable';
import MixParameterTable from './MixParameterTable';
import './Mix.css';

@inject('mixStore')
@observer
class Mix extends Component {
  render() {
    const { mixStore } = this.props;
    return (
      <div className="page-content">
        <div className="page-bar">
          <Breadcrumb className="page-breadcrumb">
            <LinkContainer to="/">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </LinkContainer>
            <Breadcrumb.Item active>Mix</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <h1 className="page-title">Mix</h1>
        <Row>
          <Col sm={6}>
            <MixTable />
            <Row>
              <Col sm={12} className="mix-button-container">
                <Button bsSize="sm" bsStyle="success">
                  Add
                </Button>
                <Button bsSize="sm" bsStyle="danger">
                  Remove
                </Button>
                <Button bsSize="sm" bsStyle="info" onClick={mixStore.checkAll}>
                  Check All
                </Button>
                <Button
                  bsSize="sm"
                  bsStyle="info"
                  onClick={mixStore.uncheckAll}
                >
                  Uncheck All
                </Button>
                <Button bsSize="sm" bsStyle="primary">
                  Print
                </Button>
              </Col>
            </Row>
          </Col>
          <Col sm={6}>
            <MixMaterialTable />
            <MixParameterTable />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Mix;
