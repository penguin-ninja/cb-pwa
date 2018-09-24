import React, { Component } from 'react';
import { inject } from 'mobx-react';
import deviceDOMHoc from 'app/hocs/deviceDOMHoc';
import {
  Display,
  DisplayItem,
  VerticalProgress,
  NormalButton,
  PushButton
} from './components';

@inject('batchStore')
class Scale extends Component {
  onOpen = () => {
    const { device, batchStore } = this.props;
    batchStore.setOutput(device.openGatePNo, '1');
    batchStore.setOutput(device.closeGatePNo, '0');
  };

  render() {
    const { device } = this.props;

    return (
      <div className="device-gui device-gui--scale">
        <div className="device-gui__row">
          <Display>
            <DisplayItem title="Status">READY</DisplayItem>
          </Display>
        </div>
        <div className="device-gui__row">
          <Display>
            <DisplayItem title="Flow Rate">100 LB/s</DisplayItem>
            <DisplayItem>
              <NormalButton bsSize="sm" bsStyle="success">
                <i className="fa fa-fw fa-plus" />
              </NormalButton>
              <NormalButton bsSize="sm" bsStyle="danger" active>
                <i className="fa fa-fw fa-minus" />
              </NormalButton>
            </DisplayItem>
          </Display>
          <Display>
            <DisplayItem title="Channel">50000</DisplayItem>
            <DisplayItem title="Target">10</DisplayItem>
            <DisplayItem>
              <PushButton
                bsSize="sm"
                bsStyle="success"
                port={device.openGatePNo}
                onPush={this.onOpen}
              >
                Open
              </PushButton>
              <PushButton
                bsSize="sm"
                bsStyle="danger"
                port={device.closeGatePNo}
              >
                Close
              </PushButton>
            </DisplayItem>
          </Display>
          <VerticalProgress value={30} />
        </div>
      </div>
    );
  }
}

export default deviceDOMHoc(Scale);
