import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactTable from 'react-table';

@inject('mixStore', 'materialStore')
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
        headerText: 'Material',
        accessor: d => d,
        id: 'name',
        Cell: row => {
          const material = this.props.materialStore.getMaterialById(
            row.value.materialId
          );
          return material && material.name;
        },
        ...this.getSortHeaderProps()
      },
      {
        headerText: 'Amount',
        accessor: 'amount',
        id: 'amount',
        ...this.getSortHeaderProps()
      },
      {
        headerText: 'By%',
        accessor: d => d,
        id: 'byPercent',
        Cell: row => {
          const material = this.props.materialStore.getMaterialById(
            row.value.materialId
          );
          const detail = this.props.materialStore.materialDetails[
            row.value.materialId
          ];

          if (material && material.assignment === 'Metered') {
            return detail && detail.percentInMixDesign ? 'Y' : 'N';
          }

          return '';
        },
        ...this.getSortHeaderProps()
      },
      {
        headerText: 'Unit',
        accessor: d => d,
        id: 'unit',
        ...this.getSortHeaderProps(),
        Cell: row => {
          return this.props.materialStore.getMaterialUnit(row.value.materialId);
        }
      },
      {
        headerText: 'Alias',
        accessor: 'alias',
        id: 'alias',
        ...this.getSortHeaderProps()
      }
    ];
  };

  render() {
    const { getCurrentMixMaterials } = this.props.mixStore;
    return (
      <ReactTable
        className="-highlight"
        data={getCurrentMixMaterials()}
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
