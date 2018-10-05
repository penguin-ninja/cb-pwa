import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactTable from 'react-table';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import LoadingButton from 'app/components/LoadingButton/LoadingButton';

@inject('cutoffStore')
@observer
class CutoffTable extends Component {
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
    const { cutoffStore } = this.props;
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          cutoffStore.changeJog(
            cellInfo.value.id,
            cellInfo.column.id,
            e.target.innerHTML
          );
        }}
      >
        {cellInfo.value[cellInfo.column.id]}
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
        headerText: 'Drop Size',
        accessor: 'dropSize',
        id: 'dropSize',
        Cell: this.renderEditable
      },
      {
        headerText: 'Free Fall',
        accessor: 'freeFall',
        id: 'freeFall',
        Cell: this.renderEditable
      }
    ];
  };

  render() {
    const {
      isModalVisible,
      cutoffArray,
      loading,
      saving,
      saveCutoff,
      onCloseModal
    } = this.props.cutoffStore;

    if (!isModalVisible) {
      return null;
    }

    return (
      <Modal onHide={onCloseModal} className="batch-material-settings-modal">
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
              data={cutoffArray}
              columns={this.getColumns()}
              sorted={this.state.sorted}
              onSortedChange={sorted => this.setState({ sorted })}
              showPaginationTop={false}
              showPaginationBottom={false}
              showPageSizeOptions={false}
              resizable={false}
              minRows={1}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onCloseModal}>Close</Button>
          &nbsp;&nbsp;
          <LoadingButton
            bsStyle="primary"
            onClick={saveCutoff}
            label="Save"
            loadingLabel="Saving"
            isLoading={saving}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CutoffTable;
