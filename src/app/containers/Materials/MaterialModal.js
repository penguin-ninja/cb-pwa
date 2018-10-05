import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import MaterialTable from './MaterialTable';
import JogTable from './JogTable';
import CutoffTable from './CutoffTable';
import BatchMaterialSettingsModal from './BatchMaterialSettings';

@inject('materialStore')
@observer
class MaterialModal extends Component {
  constructor() {
    super();
    this.state = {
      editingMaterial: null
    };
  }

  onEditMaterial = editingMaterial => {
    this.setState({
      editingMaterial
    });
  };

  onCancelEdit = () => {
    this.setState({ editingMaterial: null });
  };

  render() {
    const {
      isModalVisible,
      onCloseModal,
      unassignedMaterials,
      weighedMaterials,
      meteredMaterials
    } = this.props.materialStore;
    const { editingMaterial } = this.state;

    return (
      <Modal show={isModalVisible} onHide={onCloseModal} bsSize="lg">
        <Modal.Header closeButton>
          <Modal.Title>Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey={1} id="materials">
            <Tab eventKey={1} title="Weighed">
              <MaterialTable
                items={weighedMaterials}
                type="weighed"
                onEditMaterial={this.onEditMaterial}
              />
            </Tab>
            <Tab eventKey={2} title="Metered">
              <MaterialTable
                items={meteredMaterials}
                type="metered"
                onEditMaterial={this.onEditMaterial}
              />
            </Tab>
            <Tab eventKey={3} title="Unassigned">
              <MaterialTable
                items={unassignedMaterials}
                type="unassigned"
                onEditMaterial={this.onEditMaterial}
              />
            </Tab>
          </Tabs>
          {editingMaterial && (
            <BatchMaterialSettingsModal
              editingMaterial={editingMaterial}
              cancelEdit={this.onCancelEdit}
            />
          )}
          <JogTable />
          <CutoffTable />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MaterialModal;
