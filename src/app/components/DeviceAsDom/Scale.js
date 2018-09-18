import React, { Component } from 'react';
import deviceDOMHoc from 'app/hocs/deviceDOMHoc';
import {
  Display,
  DisplayItem,
  VerticalProgress,
  PushButton
} from './components';

class Scale extends Component {
  render() {
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
              <PushButton bsSize="sm" bsStyle="success">
                <i className="fa fa-fw fa-plus" />
              </PushButton>
              <PushButton bsSize="sm" bsStyle="danger" active>
                <i className="fa fa-fw fa-minus" />
              </PushButton>
            </DisplayItem>
          </Display>
          <Display>
            <DisplayItem title="Channel">50000</DisplayItem>
            <DisplayItem title="Target">10</DisplayItem>
            <DisplayItem>
              <PushButton bsSize="sm" bsStyle="success">
                Open
              </PushButton>
              <PushButton bsSize="sm" bsStyle="danger">
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
