import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import { confirm } from 'app/utils/modals';
import MixTable from './MixTable';
import MixMaterialTable from './MixMaterialTable';
import MixParameterTable from './MixParameterTable';
import AddMaterialModal from './AddMaterialModal';
import ChangeMaterialModal from './ChangeMaterialModal';
import RemoveMaterialModal from './RemoveMaterialModal';
import AdjustAmountModal from './AdjustAmountModal';
import AdjustPriceModal from './AdjustPriceModal';
import CloneMixModal from './CloneMixModal';
import './Mix.css';

@inject('mixStore', 'materialStore')
@observer
class Mix extends Component {
  constructor() {
    super();
    this.state = {
      isAddModalVisible: false,
      isChangeModalVisible: false,
      isAdjustModalVisible: false,
      isAdjustPriceModalVisible: false,
      isCloneMixModalVisible: false,
      isRemoveModalVisible: false
    };
  }

  componentDidMount() {
    this.props.mixStore.load();
    this.props.materialStore.loadTypes();
    this.props.materialStore.loadMaterials();
  }

  onDelete = () => {
    const { checkedIDs, checkedSize } = this.props.mixStore;

    if (!checkedSize) {
      return;
    }

    return confirm({
      title: `Are you sure you want to delete ${checkedSize} mix designs?`,
      okLabel: 'Yes',
      cancelLabel: 'No'
    })
      .then(() => {
        checkedIDs.forEach(id => {
          this.props.mixStore.deleteMix(id);
        });
      })
      .catch(() => {});
  };

  showModal = modal => () => {
    this.setState({ [`is${modal}Visible`]: true });
  };

  hideModal = modal => () => {
    this.setState({ [`is${modal}Visible`]: false });
  };

  render() {
    const { mixStore } = this.props;
    const { checkedSize } = mixStore;
    return (
      <div className="page-content">
        <div className="page-bar">
          <Breadcrumb className="page-breadcrumb">
            <LinkContainer to="/">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </LinkContainer>
            <Breadcrumb.Item active>Mix</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <h1 className="page-title">Mix</h1>
        <Row>
          <Col sm={6}>
            <MixTable />
            <Row>
              <Col sm={12} className="mix-button-container">
                <DropdownButton
                  id="mix-editor"
                  bsSize="sm"
                  bsStyle="info"
                  title="Mix Editor"
                >
                  <MenuItem
                    onSelect={this.showModal('AddModal')}
                    disabled={!checkedSize}
                  >
                    Add Material
                  </MenuItem>
                  <MenuItem
                    onSelect={this.showModal('ChangeModal')}
                    disabled={!checkedSize}
                  >
                    Change Material
                  </MenuItem>
                  <MenuItem
                    onSelect={this.showModal('RemoveModal')}
                    disabled={!checkedSize}
                  >
                    Remove Material
                  </MenuItem>
                  <MenuItem
                    onSelect={this.showModal('AdjustModal')}
                    disabled={!checkedSize}
                  >
                    Adjust Material Amount
                  </MenuItem>
                  <MenuItem onSelect={this.showModal('AdjustPriceModal')}>
                    Adjust Mix Price
                  </MenuItem>
                  <MenuItem onSelect={this.showModal('CloneMixModal')}>
                    Save New Copy As
                  </MenuItem>
                </DropdownButton>
                <Button bsSize="sm" bsStyle="success" onClick={mixStore.addMix}>
                  Add
                </Button>
                <Button
                  bsSize="sm"
                  bsStyle="danger"
                  onClick={this.onDelete}
                  disabled={!checkedSize}
                >
                  Remove
                </Button>
                <Button bsSize="sm" bsStyle="info" onClick={mixStore.checkAll}>
                  Check All
                </Button>
                <Button
                  bsSize="sm"
                  bsStyle="info"
                  onClick={mixStore.uncheckAll}
                >
                  Uncheck All
                </Button>
                <Button
                  bsSize="sm"
                  bsStyle="primary"
                  disabled={!checkedSize}
                  onClick={mixStore.print}
                >
                  Print
                </Button>
              </Col>
            </Row>
          </Col>
          <Col sm={6}>
            <MixMaterialTable />
            <MixParameterTable />
          </Col>
        </Row>
        <AddMaterialModal
          showModal={this.state.isAddModalVisible}
          onHide={this.hideModal('AddModal')}
        />
        <ChangeMaterialModal
          showModal={this.state.isChangeModalVisible}
          onHide={this.hideModal('ChangeModal')}
        />
        <RemoveMaterialModal
          showModal={this.state.isRemoveModalVisible}
          onHide={this.hideModal('RemoveModal')}
        />
        <AdjustAmountModal
          showModal={this.state.isAdjustModalVisible}
          onHide={this.hideModal('AdjustModal')}
        />
        <AdjustPriceModal
          showModal={this.state.isAdjustPriceModalVisible}
          onHide={this.hideModal('AdjustPriceModal')}
        />
        <CloneMixModal
          showModal={this.state.isCloneMixModalVisible}
          onHide={this.hideModal('CloneMixModal')}
        />
      </div>
    );
  }
}

export default Mix;
