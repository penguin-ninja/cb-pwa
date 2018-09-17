import React, { Component } from 'react';
import cx from 'classnames';
import Button from 'react-bootstrap/lib/Button';

class PushButton extends Component {
  render() {
    const { active, ...otherProps } = this.props;
    const className = cx('device-gui__toggle', {
      'device-gui__toggle--active': active
    });

    return (
      <Button bsSize="sm" className={className} {...otherProps}>
        On/Off
      </Button>
    );
  }
}

export default PushButton;
