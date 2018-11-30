import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ScheduleHeadRow from './ScheduleHeadRow';
import ScheduleRow from './ScheduleRow';

@inject('scheduleStore')
@observer
class ScheduleTable extends Component {
  render() {
    const { schedules, loading } = this.props.scheduleStore;

    if (loading) {
      return (
        <h5 className="text-center">
          <i className="fa fa-circle-o-notch fa-spin" /> Loading...
        </h5>
      );
    }

    return (
      <div className="schedule-table">
        <ScheduleHeadRow />
        <div className="schedule-table__body">
          {schedules.map((schedule, index) => (
            <ScheduleRow key={index} schedule={schedule} />
          ))}
        </div>
      </div>
    );
  }
}

export default ScheduleTable;
