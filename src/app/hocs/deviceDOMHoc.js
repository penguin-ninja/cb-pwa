import React from 'react';
import { Rnd } from 'react-rnd';
import './deviceDOMHoc.css';

export default function deviceDOMHoc(WrappedComponent) {
  return class extends React.Component {
    onDragStop = (e, d) => {
      this.props.onUpdate({
        x: d.x,
        y: d.y
      });
    };

    onResize = (e, direction, ref, delta, position) => {
      this.props.onUpdate({
        length: ref.style.width.replace('px', '') * 1,
        size: ref.style.height.replace('px', '') * 1,
        ...position
      });
    };

    renderEdit() {
      const { onEdit } = this.props;

      return <i className="fa fa-pencil device-dom__edit" onClick={onEdit} />;
    }

    render() {
      const { width, height, x, y } = this.props;
      const position = { x, y };
      const size = { width, height };

      return (
        <Rnd
          className="device-dom__wrapper"
          position={position}
          size={size}
          onDragStop={this.onDragStop}
          onResize={this.onResize}
        >
          <WrappedComponent {...this.props} />
          {this.renderEdit()}
        </Rnd>
      );
    }
  };
}
