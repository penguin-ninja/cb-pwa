import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import SideBar from 'app/components/SideBar/SideBar';
import MaterialTable from './MaterialTable';
import JogTable from './JogTable';
import CutoffTable from './CutoffTable';
import BatchMaterialSettingsModal from './BatchMaterialSettings';

@inject('materialStore')
@observer
class Materials extends Component {
  constructor() {
    super();
    this.state = {
      editingMaterial: null
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

  render() {
    const {
      unassignedMaterials,
      weighedMaterials,
      meteredMaterials
    } = this.props.materialStore;
    const { editingMaterial } = this.state;

    return (
      <SideBar type="materials">
        <h3>
          <i className="fa fa-cubes" /> Materials
        </h3>
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
      </SideBar>
    );
  }
}

export default Materials;
