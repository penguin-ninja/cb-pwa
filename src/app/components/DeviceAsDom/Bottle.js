import React, { Component } from 'react';
import deviceDOMHoc from 'app/hocs/deviceDOMHoc';
import {
  Display,
  DisplayItem,
  VerticalProgress,
  PushButton
} from './components';

class Bottle extends Component {
  render() {
    return (
      <div className="device-gui device-gui--bottle">
        <div className="device-gui__row">
          <Display>
            <DisplayItem title="Status">IDLE</DisplayItem>
            <DisplayItem title="Input Status">None</DisplayItem>
            <DisplayItem>
              <PushButton bsStyle="info">On/Off</PushButton>
            </DisplayItem>
          </Display>
          <VerticalProgress value={30} />
        </div>
      </div>
    );
  }
}

export default deviceDOMHoc(Bottle);
