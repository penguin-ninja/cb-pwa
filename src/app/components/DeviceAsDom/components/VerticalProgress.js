import React, { Component } from 'react';
import './VerticalProgress.css';

class VerticalProgress extends Component {
  render() {
    const { value } = this.props;
    let height = Math.min(value, 100);
    height = Math.max(value, 0);

    return (
      <div className="device-gui__progress">
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped active"
            style={{ height }}
          />
        </div>
      </div>
    );
  }
}

export default VerticalProgress;
