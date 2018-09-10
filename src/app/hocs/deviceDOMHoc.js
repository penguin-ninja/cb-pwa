import React from 'react';
import './deviceDOMHoc.css';

export default function deviceDOMHoc(WrappedComponent) {
  return class extends React.Component {
    renderEdit() {
      const { x, y, width, height } = this.props;
      const style = {
        x: x + width + 20,
        y: y + height - 10
      };

      return <i className="fa fa-pencil device-dom__edit" style={style} />;
    }

    render() {
      const { width, height } = this.props;
      const style = {
        width,
        height
      };

      return (
        <div className="device-dom__wrapper" style={style}>
          <WrappedComponent {...this.props} />
          {this.renderEdit()}
        </div>
      );
    }
  };
}
