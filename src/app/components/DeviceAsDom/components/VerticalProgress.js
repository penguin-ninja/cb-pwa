import React, { Component } from 'react';
import cx from 'classnames';
import './VerticalProgress.css';

class VerticalProgress extends Component {
  render() {
    const { value, active } = this.props;
    let height = Math.min(value, 100);
    height = Math.max(value, 0);

    const CN = cx('progress-bar progress-bar-striped', {
      active
    });

    return (
      <div className="device-gui__progress">
        <div className="progress">
          <div className={CN} style={{ height }} />
        </div>
      </div>
    );
  }
}

export default VerticalProgress;
