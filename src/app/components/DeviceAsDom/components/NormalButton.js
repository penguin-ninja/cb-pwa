import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import pick from 'lodash/pick';
import { inject } from 'mobx-react';

@inject('batchStore')
class NormalButton extends Component {
  onMouseDown = e => {
    // stop bubbling to prevent unexpected dragging
    e.stopPropagation();
  };

  onClick = e => {
    const { port, duration, batchStore } = this.props;
    batchStore.setOutput(port, duration);
  };

  render() {
    const allowedProps = pick(this.props, ['bsStyle', 'bsSize']);

    return (
      <Button
        bsSize="sm"
        bsStyle="primary"
        {...allowedProps}
        onMouseDown={this.onMouseDown}
        onClick={this.onClick}
      >
        {this.props.children || <i className="fa fa-arrow-down" />}
      </Button>
    );
  }
}

NormalButton.propTypes = {
  port: PropTypes.number.isRequired,
  duration: PropTypes.string.isRequired
};

NormalButton.defaultProps = {
  port: 0,
  duration: '3000'
};

export default NormalButton;
