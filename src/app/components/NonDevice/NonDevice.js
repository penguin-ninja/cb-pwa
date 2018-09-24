import React from 'react';
import { Rnd } from 'react-rnd';
import cx from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import './NonDevice.css';

class NonDevice extends React.Component {
  constructor() {
    super();
    this.state = {
      dragging: false,
      resizing: false
    };
  }

  onDrag = () => {
    this.setState({ dragging: true });
  };

  onDragStop = (e, d) => {
    setTimeout(() => {
      this.setState({ dragging: false });
    }, 100);

    if (d.x !== this.props.x || d.y !== this.props.y) {
      this.props.onUpdate({
        x: d.x,
        y: d.y
      });
    }
  };

  onResize = (e, direction, ref, delta, position) => {
    this.setState({ resizing: true });
    this.props.onUpdate({
      length: ref.style.width.replace('px', '') * 1,
      size: ref.style.height.replace('px', '') * 1,
      ...position
    });
  };

  onResizeStop = () => {
    setTimeout(() => {
      this.setState({ resizing: false });
    }, 100);
  };

  onClick = () => {
    const { resizing, dragging } = this.state;

    if (resizing || dragging) {
      return false;
    }

    this.props.onClick();
  };

  render() {
    const { width, height, x, y, icon, title, shortKey } = this.props;
    const position = { x, y };
    const size = { width, height };
    const iconCN = cx('fa', `fa-${icon}`);

    return (
      <Rnd
        className="non-device"
        position={position}
        size={size}
        minWidth={100}
        minHeight={30}
        onDragStop={this.onDragStop}
        onDrag={this.onDrag}
        onResize={this.onResize}
        onResizeStop={this.onResizeStop}
      >
        <Button
          className="non-device__button dark-stripe default"
          style={size}
          onClick={this.onClick}
        >
          {shortKey && (
            <span className="non-device__shortkey">[{shortKey}]</span>
          )}
          <i className={iconCN} />
          {title && <span className="non-device__title">{title}</span>}
        </Button>
      </Rnd>
    );
  }
}

export default NonDevice;
