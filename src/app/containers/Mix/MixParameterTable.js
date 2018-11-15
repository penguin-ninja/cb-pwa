import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactTable from 'react-table';

@inject('mixStore')
@observer
class MixMaterialTable extends Component {
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

  renderEditable = cellInfo => {
    const { mixStore } = this.props;
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          mixStore.changeParameter(
            cellInfo.row._original.mixId,
            cellInfo.row._original.id,
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
        headerText: 'Parameter',
        accessor: 'name',
        id: 'name',
        ...this.getSortHeaderProps()
      },
      {
        headerText: 'Value',
        accessor: 'value',
        id: 'value',
        ...this.getSortHeaderProps(),
        Cell: this.renderEditable
      }
    ];
  };

  render() {
    const { getCurrentMixParameters } = this.props.mixStore;
    return (
      <ReactTable
        className="-highlight"
        data={getCurrentMixParameters()}
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

export default MixMaterialTable;
