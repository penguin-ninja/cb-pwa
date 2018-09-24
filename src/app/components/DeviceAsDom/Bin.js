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
class Bin extends Component {
  render() {
    const { device, batchStore } = this.props;
    return (
      <div className="device-gui device-gui--bin">
        <div className="device-gui__row">
          <Display>
            <DisplayItem title="Status">IDLE</DisplayItem>
            <DisplayItem title="Channel">
              {batchStore.channels[device.scaleId - 1]}
            </DisplayItem>
            <DisplayItem title="Target">10</DisplayItem>
            <DisplayItem title="Moisture">None</DisplayItem>
            <DisplayItem title="Balance">None</DisplayItem>
            <DisplayItem>
              <PushButton port={device.gateOnePNo} />
            </DisplayItem>
          </Display>
          <VerticalProgress
            value={30}
            active={batchStore.outputs[device.gateOnePNo - 1] === '1'}
          />
        </div>
      </div>
    );
  }
}

export default deviceDOMHoc(Bin);
