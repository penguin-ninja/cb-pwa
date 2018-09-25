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
class Tank extends Component {
  render() {
    const { device, batchStore } = this.props;
    return (
      <div className="device-gui device-gui--tank">
        <div className="device-gui__row">
          <Display>
            <DisplayItem title="Status">IDLE</DisplayItem>
            <DisplayItem title="Input Status">None</DisplayItem>
            <DisplayItem>
              <PushButton port={device.gatePNo} />
            </DisplayItem>
          </Display>
          <VerticalProgress
            value={30}
            active={batchStore.outputs[device.gatePNo - 1] === '1'}
          />
        </div>
      </div>
    );
  }
}

export default deviceDOMHoc(Tank);
