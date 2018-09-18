import React, { Component } from 'react';
import deviceDOMHoc from 'app/hocs/deviceDOMHoc';
import {
  Display,
  DisplayItem,
  VerticalProgress,
  PushButton
} from './components';

class Bin extends Component {
  render() {
    return (
      <div className="device-gui device-gui--bin">
        <div className="device-gui__row">
          <Display>
            <DisplayItem title="Status">IDLE</DisplayItem>
            <DisplayItem title="Channel">50000</DisplayItem>
            <DisplayItem title="Target">10</DisplayItem>
            <DisplayItem title="Moisture">None</DisplayItem>
            <DisplayItem title="Balance">None</DisplayItem>
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

export default deviceDOMHoc(Bin);
