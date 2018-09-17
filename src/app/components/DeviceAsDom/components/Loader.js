import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import { css } from 'react-emotion';

const override = css`
  margin-left: 15px;
  border-radius: 100% !important;
`;

class Loader extends Component {
  render() {
    return (
      <ClipLoader
        className={override}
        sizeUnit="px"
        size={20}
        color="#FFFFFF"
        loading={this.props.loading}
      />
    );
  }
}

export default Loader;
