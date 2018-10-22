import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactTable from 'react-table';

@inject('scheduleStore')
@observer
class ScheduleTable extends Component {
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
        headerText: 'Ship Date',
        accessor: 'ship_date',
        id: 'ship_date',
        ...this.getSortHeaderProps()
      },
      {
        headerText: 'Ship Time',
        accessor: 'ship_time',
        id: 'ship_time',
        ...this.getSortHeaderProps()
      },
      {
        headerText: 'Ship Time',
        accessor: 'ship_time',
        id: 'ship_time',
        ...this.getSortHeaderProps()
      },
      {
        headerText: 'YDS',
        accessor: 'yds',
        id: 'yds',
        ...this.getSortHeaderProps()
      },
      {
        headerText: 'BAL',
        accessor: 'bal',
        id: 'bal',
        ...this.getSortHeaderProps()
      },
      {
        headerText: 'Job',
        accessor: 'job',
        id: 'job',
        ...this.getSortHeaderProps()
      },
      {
        headerText: 'Truck',
        accessor: 'truck',
        id: 'truck',
        ...this.getSortHeaderProps()
      },
      {
        headerText: 'Sold To',
        accessor: 'sold_to',
        id: 'sold_to',
        ...this.getSortHeaderProps()
      },
      {
        headerText: 'Ship To',
        accessor: 'ship_to',
        id: 'ship_to',
        ...this.getSortHeaderProps()
      }
    ];
  };

  render() {
    const { schedules, loading } = this.props.scheduleStore;

    return loading ? (
      <h5 className="text-center">
        <i className="fa fa-circle-o-notch fa-spin" /> Loading...
      </h5>
    ) : (
      <ReactTable
        className="-highlight"
        data={schedules}
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
    );
  }
}

export default ScheduleTable;
