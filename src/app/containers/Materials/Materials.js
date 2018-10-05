import React, { Component } from 'react';
import { inject } from 'mobx-react';
import MaterialModal from './MaterialModal';

@inject('materialStore')
class Materials extends Component {
  componentDidMount() {
    this.props.materialStore.loadTypes();
    this.props.materialStore.loadMaterials();
  }

  render() {
    return (
      <React.Fragment>
        <MaterialModal />
      </React.Fragment>
    );
  }
}

export default Materials;
