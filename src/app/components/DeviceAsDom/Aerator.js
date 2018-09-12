import React, { Component } from 'react';
import deviceDOMHoc from 'app/hocs/deviceDOMHoc';

class Aerator extends Component {
  // constructor(...args) {
  //   super(...args);
  // }

  render() {
    const { x, y, width, height, device } = this.props;

    return (
      <div className="device-gui device--aerator">{device.description}</div>
    );
  }
}

export default deviceDOMHoc(Aerator);
