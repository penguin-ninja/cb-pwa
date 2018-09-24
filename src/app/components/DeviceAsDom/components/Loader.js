import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';
import { css } from 'react-emotion';
import './Loader.css';

const override = css`
  border-radius: 100% !important;
`;

@inject('batchStore')
@observer
class Loader extends Component {
  render() {
    const { batchStore, port } = this.props;

    return (
      <div className="device-gui__loader-wrapper">
        <ClipLoader
          className={override}
          sizeUnit="px"
          size={20}
          color="#FFFFFF"
          loading={batchStore.outputs[port - 1] === '1'}
        />
      </div>
    );
  }
}

Loader.propTypes = {
  port: PropTypes.number.isRequired
};

Loader.defaultProps = {
  port: 0
};

export default Loader;
