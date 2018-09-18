import React from 'react';
import { Rnd } from 'react-rnd';
import cx from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import './NonDevice.css';

class NonDevice extends React.Component {
  // onDragStop = (e, d) => {
  //   this.props.onUpdate({
  //     x: d.x,
  //     y: d.y
  //   });
  // };
  //
  // onResize = (e, direction, ref, delta, position) => {
  //   this.props.onUpdate({
  //     length: ref.style.width.replace('px', '') * 1,
  //     size: ref.style.height.replace('px', '') * 1,
  //     ...position
  //   });
  // };

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
        onResize={this.onResize}
      >
        <Button className="non-device__button dark-stripe default">
          {shortKey && (
            <span className="non-device__shortkey">[{shortKey}]</span>
          )}
          <i className={iconCN} />
          <span className="non-device__title">{title}</span>
        </Button>
      </Rnd>
    );
  }
}

export default NonDevice;
