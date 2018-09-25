import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import deviceDOMHoc from 'app/hocs/deviceDOMHoc';
import {
  Display,
  DisplayItem,
  VerticalProgress,
  PushButton
} from './components';

@inject('batchStore')
@observer
class Pump extends Component {
  render() {
    const { device, batchStore } = this.props;
    return (
      <div className="device-gui device-gui--pump">
        <div className="device-gui__row">
          <Display>
            <DisplayItem title="Status">IDLE</DisplayItem>
            <DisplayItem title="Meter Count">50000</DisplayItem>
            <DisplayItem title="Meter Target">10</DisplayItem>
            <DisplayItem title="Balance">None</DisplayItem>
            <DisplayItem>
              <PushButton port={device.gatePNo} />
            </DisplayItem>
          </Display>
          <VerticalProgress
            active={batchStore.outputs[device.gatePNo - 1] === '1'}
            value={50}
          />
        </div>
      </div>
    );
  }
}

export default deviceDOMHoc(Pump);
