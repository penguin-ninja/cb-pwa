import React, { Component } from 'react';
import deviceDOMHoc from 'app/hocs/deviceDOMHoc';
import { Display, DisplayItem } from './components';

class Moisture extends Component {
  render() {
    return (
      <div className="device-gui device-gui--moisture-tester">
        <div className="device-gui__row">
          <Display>
            <DisplayItem title="Moisture">None</DisplayItem>
          </Display>
        </div>
      </div>
    );
  }
}

export default deviceDOMHoc(Moisture);
