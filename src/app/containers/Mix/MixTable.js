import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactTable from 'react-table';
import MixCheckbox from './MixCheckbox';
import MixRow from './MixRow';

@inject('mixStore')
@observer
class MixTable extends Component {
  constructor() {
    super();
    this.state = {
      sorted: []
    };
  }

  getTrProps = (state, rowInfo) => {
    if (!rowInfo) return {};

    const id = rowInfo.row._original.id;

    return {
      rowId: id
    };
  };

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

  renderCheckbox = row => {
    const id = row.value.id;

    return <MixCheckbox id={id} />;
  };

  renderEditable = cellInfo => {
    const { mixStore } = this.props;
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          mixStore.changeMix(
            cellInfo.row._original.id,
            cellInfo.column.id,
            e.target.innerHTML
          );
        }}
      >
        {cellInfo.row[cellInfo.column.id]}
      </div>
    );
  };

  getColumns = () => {
    return [
      {
        Header: '',
        accessor: d => d,
        id: 'checkbox',
        Cell: this.renderCheckbox,
        maxWidth: 50
      },
      {
        headerText: 'Code',
        accessor: 'code',
        id: 'code',
        ...this.getSortHeaderProps(),
        Cell: this.renderEditable
      },
      {
        headerText: 'Description',
        accessor: 'description',
        id: 'description',
        ...this.getSortHeaderProps(),
        Cell: this.renderEditable
      }
    ];
  };

  render() {
    const { mixes } = this.props.mixStore;
    return (
      <ReactTable
        className="-highlight mix-table"
        data={mixes.toJS()}
        TrComponent={MixRow}
        getTrProps={this.getTrProps}
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

export default MixTable;
