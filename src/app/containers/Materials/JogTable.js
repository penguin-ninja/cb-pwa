import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactTable from 'react-table';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import LoadingButton from 'app/components/LoadingButton/LoadingButton';

@inject('jogStore')
@observer
class JogTable extends Component {
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
    const { jogStore } = this.props;
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          jogStore.changeJog(
            cellInfo.row.id,
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
        headerText: 'ID',
        accessor: 'id',
        id: 'id',
        ...this.getSortHeaderProps()
      },
      {
        headerText: 'Jog Open',
        accessor: 'open',
        id: 'open',
        ...this.getSortHeaderProps(),
        Cell: this.renderEditable
      },
      {
        headerText: 'Jog Weight',
        accessor: 'weight',
        id: 'weight',
        ...this.getSortHeaderProps(),
        Cell: this.renderEditable
      }
    ];
  };

  render() {
    const {
      isModalVisible,
      jogArray,
      loading,
      saving,
      saveJog,
      onCloseModal
    } = this.props.jogStore;

    if (!isModalVisible) {
      return null;
    }

    return (
      <Modal show onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Jog Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <h5 className="text-center">
              <i className="fa fa-circle-o-notch fa-spin" /> Loading...
            </h5>
          ) : (
            <ReactTable
              className="-highlight"
              data={jogArray}
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
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onCloseModal}>Close</Button>
          &nbsp;&nbsp;
          <LoadingButton
            bsStyle="primary"
            onClick={saveJog}
            label="Save"
            loadingLabel="Saving"
            isLoading={saving}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default JogTable;
