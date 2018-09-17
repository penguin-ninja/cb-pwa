import React, { Component } from 'react';
import './Display.css';

export class DisplayItem extends Component {
  render() {
    const { children, title, ...otherProps } = this.props;

    return (
      <div className="device-gui__display-item" {...otherProps}>
        {title && (
          <div className="device-gui__display-item__title">{title}:</div>
        )}
        <div className="device-gui__display-item__value">{children}</div>
      </div>
    );
  }
}

class Display extends Component {
  render() {
    const { children, ...otherProps } = this.props;
    return (
      <div className="device-gui__display well" {...otherProps}>
        {children}
      </div>
    );
  }
}

export default Display;
