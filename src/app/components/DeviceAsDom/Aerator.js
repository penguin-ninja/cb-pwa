import React, { Component } from 'react';
import deviceDOMHoc from 'app/hocs/deviceDOMHoc';

class Aerator extends Component {
  // constructor(...args) {
  //   super(...args);
  // }

  render() {
    const { x, y, width, height } = this.props;

    return <div className="device--aerator">Aerator</div>;
  }
}

export default deviceDOMHoc(Aerator);
