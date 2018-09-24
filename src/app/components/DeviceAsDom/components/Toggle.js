import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Toggle from 'react-toggle';
import './Toggle.css';

@inject('batchStore')
@observer
class CustomToggle extends Component {
  onMouseDown = e => {
    // stop bubbling event for dragging
    e.stopPropagation();
  };

  onChange = e => {
    const { batchStore, port } = this.props;
    const checked = e.target.checked;

    batchStore.setOutput(port, checked ? '1' : '0');
  };

  render() {
    const { batchStore, port } = this.props;
    return (
      <div
        className="device-gui__toggle-wrapper"
        onMouseDown={this.onMouseDown}
      >
        <Toggle
          onChange={this.onChange}
          icons={{ checked: 'On', unchecked: 'Off' }}
          value={batchStore.outputs[port - 1] === '1' ? 'yes' : 'no'}
        />
      </div>
    );
  }
}

CustomToggle.propTypes = {
  port: PropTypes.number.isRequired
};

CustomToggle.defaultProps = {
  port: 0
};

export default CustomToggle;
