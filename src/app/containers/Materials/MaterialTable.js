import React, { Component } from 'react';
import { inject } from 'mobx-react';
import ReactTable from 'react-table';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import './MaterialTable.css';

const WEIGHED_COLUMNS = [
  {
    headerText: 'Bin ID',
    accessor: 'binId',
    id: 'binId'
  },
  {
    headerText: 'Current Balance',
    accessor: d => d,
    id: 'currentBalance',
    Cell: row => `${row.value.currentBalance} TON`
  },
  {
    headerText: 'Used Today',
    accessor: d => d,
    id: 'usageToday',
    Cell: row => `${row.value.usageToday} TON`
  },
  {
    headerText: 'Delivered Today',
    accessor: d => d,
    id: 'shipmentToday',
    Cell: row => `${row.value.shipmentToday} TON`
  }
];

const METERED_COLUMNS = [
  {
    headerText: 'Pump ID',
    accessor: 'pumpId',
    id: 'pumpId'
  },
  {
    headerText: 'Current Balance',
    accessor: d => d,
    id: 'currentBalance',
    Cell: row => `${row.value.currentBalance} GL`
  },
  {
    headerText: 'Used Today',
    accessor: d => d,
    id: 'usageToday',
    Cell: row => `${row.value.usageToday} GL`
  },
  {
    headerText: 'Delivered Today',
    accessor: d => d,
    id: 'shipmentToday',
    Cell: row => `${row.value.shipmentToday} GL`
  }
];

const COLUMN_MAP = {
  weighed: WEIGHED_COLUMNS,
  metered: METERED_COLUMNS,
  unassigned: []
};

@inject('materialStore')
class MaterialTable extends Component {
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
        headerText: 'Name',
        accessor: 'name',
        id: 'name',
        ...this.getSortHeaderProps()
      },
      ...COLUMN_MAP[this.props.type].map(c => ({
        ...c,
        ...this.getSortHeaderProps()
      })),
      {
        headerText: '',
        width: 100,
        id: 'actions',
        accessor: d => d,
        Cell: this.renderActionCell,
        sortable: false
      }
    ];
  };

  renderActionCell = row => {
    const { assignment } = row.value;
    const actions = [
      <OverlayTrigger
        key="edit"
        placement="bottom"
        overlay={<Tooltip id="edit">Edit Material</Tooltip>}
      >
        <a
          className="material-action"
          onClick={() => this.props.onEditMaterial(row.value)}
        >
          <i className="fa fa-fw fa-pencil" />
        </a>
      </OverlayTrigger>
    ];

    if (assignment !== 'None') {
      actions.push(
        <OverlayTrigger
          key="delivery"
          placement="bottom"
          overlay={<Tooltip id="edit">Delivery Options</Tooltip>}
        >
          <a className="material-action" onClick={() => undefined}>
            <i className="fa fa-fw fa-truck" />
          </a>
        </OverlayTrigger>,
        <OverlayTrigger
          key="inventory"
          placement="bottom"
          overlay={<Tooltip id="edit">Inventory Adjustment</Tooltip>}
        >
          <a className="material-action" onClick={() => undefined}>
            <i className="fa fa-fw fa-sliders" />
          </a>
        </OverlayTrigger>
      );
    }

    return <div>{actions}</div>;
  };

  render() {
    const { items, type } = this.props;
    return (
      <ReactTable
        className="-highlight"
        noDataText={`No ${type} materials`}
        getTrProps={this.getTrProps}
        data={items}
        columns={this.getColumns()}
        sorted={this.state.sorted}
        onSortedChange={sorted => this.setState({ sorted })}
        showPaginationTop={false}
        showPaginationBottom={false}
        showPageSizeOptions={false}
        resizable={false}
        minRows={1}
      />
    );
  }
}

export default MaterialTable;
