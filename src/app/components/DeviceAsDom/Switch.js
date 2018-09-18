import React, { Component } from 'react';
import deviceDOMHoc from 'app/hocs/deviceDOMHoc';
import Toggle from 'react-toggle';

class Switch extends Component {
  render() {
    return (
      <div className="device-gui device-gui--switch">
        <Toggle icons={{ checked: 'On', unchecked: 'Off' }} />
      </div>
    );
  }
}

export default deviceDOMHoc(Switch);
