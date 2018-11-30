import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import SideBar from 'app/components/SideBar/SideBar';
import Button from 'react-bootstrap/lib/Button';
import ScheduleTable from './SchedulesTable';
import EditScheduleModal from './EditScheduleModal';
import './Schedule.css';

@inject('scheduleStore')
@observer
class Schedules extends Component {
  onNewSchedule = () => {
    this.props.scheduleStore.onEdit('new');
  };

  render() {
    const { editingScheduleId } = this.props.scheduleStore;

    return (
      <SideBar type="schedules">
        <div className="schedules__heading">
          <h3>
            <i className="fa fa-clock-o" /> Schedules
          </h3>
          <Button
            bsStyle="primary"
            className="pull-right"
            onClick={this.onNewSchedule}
          >
            <i className="fa fa-plus" /> Add Schedule
          </Button>
        </div>
        <div className="schedules__body">
          <ScheduleTable />
        </div>
        {editingScheduleId && <EditScheduleModal />}
      </SideBar>
    );
  }
}

export default Schedules;
