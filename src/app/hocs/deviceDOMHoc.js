import React from 'react';
import { Rnd } from 'react-rnd';
import './deviceDOMHoc.css';

export default function deviceDOMHoc(WrappedComponent) {
  return class extends React.Component {
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

    renderDesc() {
      return (
        <div className="device-dom__title">{this.props.device.description}</div>
      );
    }

    renderEdit() {
      const { onEdit } = this.props;

      return (
        <a
          className="btn btn-circle btn-icon-only btn-default btn-xs device-dom__edit"
          onClick={onEdit}
        >
          <i className="icon-pencil" />
        </a>
      );
    }

    renderDelete() {
      const { onDelete } = this.props;

      return (
        <a
          className="btn btn-circle btn-icon-only btn-default btn-xs device-dom__delete"
          onClick={onDelete}
        >
          <i className="icon-trash" />
        </a>
      );
    }

    render() {
      const { width, height, x, y } = this.props;
      const { dragging, resizing } = this.state;
      const position = { x, y };
      const size = { width, height };

      return (
        <Rnd
          className="device-dom__wrapper"
          position={position}
          size={size}
          minWidth={100}
          minHeight={30}
          onDragStop={this.onDragStop}
          onDrag={this.onDrag}
          onResize={this.onResize}
          onResizeStop={this.onResizeStop}
        >
          {this.renderDesc()}
          <WrappedComponent
            {...this.props}
            dragging={dragging}
            resizing={resizing}
          />
          {this.renderEdit()}
          {this.renderDelete()}
        </Rnd>
      );
    }
  };
}
