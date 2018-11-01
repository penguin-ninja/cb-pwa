import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';
import Button from 'react-bootstrap/lib/Button';
import ScheduleTable from './SchedulesTable';
import EditScheduleModal from './EditScheduleModal';

@inject('scheduleStore')
@observer
class Schedules extends Component {
  onNewSchedule = () => {
    this.props.scheduleStore.onEdit('new');
  };

  render() {
    const { editingScheduleId } = this.props.scheduleStore;

    return (
      <div className="page-content">
        <div className="page-bar">
          <Breadcrumb className="page-breadcrumb">
            <LinkContainer to="/">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </LinkContainer>
            <Breadcrumb.Item active>Schedules</Breadcrumb.Item>
          </Breadcrumb>
          <div className="page-toolbar">
            <Button
              bsStyle="primary"
              className="pull-right"
              onClick={this.onNewSchedule}
            >
              <i className="fa fa-plus" /> Add Schedule
            </Button>
          </div>
        </div>
        <h1 className="page-title">Schedules</h1>
        <ScheduleTable />
        {editingScheduleId && <EditScheduleModal />}
      </div>
    );
  }
}

export default Schedules;
