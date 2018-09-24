import React, { Component } from 'react';
import deviceDOMHoc from 'app/hocs/deviceDOMHoc';
import BeltType1 from './BeltType1';
import BeltType2 from './BeltType2';

class Belt extends Component {
  render() {
    const { device } = this.props;

    if (device.beltOffPNo > 0) {
      return <BeltType1 {...this.props} />;
    }

    return <BeltType2 {...this.props} />;
  }
}

export default deviceDOMHoc(Belt);
