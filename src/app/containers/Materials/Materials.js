import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';
import MaterialTable from './MaterialTable';
import JogTable from './JogTable';
import CutoffTable from './CutoffTable';
import BatchMaterialSettingsModal from './BatchMaterialSettings';
import InventoryAdjustModal from './InventoryAdjust';
import DeliveryOptionsModal from './DeliveryOptions';
import ShipInModal from './ShipInModal';

@inject('materialStore')
@observer
class Materials extends Component {
  constructor() {
    super();
    this.state = {
      editingMaterial: null,
      adjustingMaterialId: null
    };
  }

  componentWillMount() {
    this.props.materialStore.loadTypes();
    this.props.materialStore.loadMaterials();
  }

  onEditMaterial = editingMaterial => {
    this.setState({
      editingMaterial
    });
  };

  onCancelEdit = () => {
    this.setState({ editingMaterial: null });
  };

  onAdjustMaterial = adjustingMaterialId => {
    this.setState({ adjustingMaterialId });
  };

  onCloseAdjust = () => {
    this.setState({ adjustingMaterialId: null });
  };

  render() {
    const {
      unassignedMaterials,
      weighedMaterials,
      meteredMaterials
    } = this.props.materialStore;
    const { editingMaterial, adjustingMaterialId } = this.state;

    return (
      <div className="page-content">
        <div className="page-bar">
          <Breadcrumb className="page-breadcrumb">
            <LinkContainer to="/">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </LinkContainer>
            <Breadcrumb.Item active>Materials</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <h1 className="page-title">Materials</h1>
        <Tabs defaultActiveKey={1} id="materials">
          <Tab eventKey={1} title="Weighed">
            <MaterialTable
              items={weighedMaterials}
              type="weighed"
              onEditMaterial={this.onEditMaterial}
              onAdjustMaterial={this.onAdjustMaterial}
            />
          </Tab>
          <Tab eventKey={2} title="Metered">
            <MaterialTable
              items={meteredMaterials}
              type="metered"
              onEditMaterial={this.onEditMaterial}
              onAdjustMaterial={this.onAdjustMaterial}
            />
          </Tab>
          <Tab eventKey={3} title="Unassigned">
            <MaterialTable
              items={unassignedMaterials}
              type="unassigned"
              onEditMaterial={this.onEditMaterial}
              onAdjustMaterial={this.onAdjustMaterial}
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
        <DeliveryOptionsModal />
        <ShipInModal />
        <InventoryAdjustModal
          materialId={adjustingMaterialId}
          onCloseModal={this.onCloseAdjust}
        />
      </div>
    );
  }
}

export default Materials;
