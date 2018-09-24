import React, { Component } from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import pick from 'lodash/pick';
import './PushButton.css';

@inject('batchStore')
class PushButton extends Component {
  constructor() {
    super();
    this.state = {
      active: false
    };
  }

  onMouseDown = e => {
    // stop bubbling to prevent unexpected dragging
    e.stopPropagation();

    this.setState({ active: true });

    const { port, batchStore, onPush } = this.props;
    batchStore.setOutput(port, '1');

    if (onPush) {
      onPush();
    } else {
      batchStore.setOutput(port, '1');
    }

    this.isMouseDown = true;

    // binding mouseup listener for release
    window.addEventListener('mouseup', this.onMouseUp);
  };

  onMouseUp = e => {
    if (!this.isMouseDown) {
      return;
    }

    // stop bubbling to prevent unexpected dragging
    e.stopPropagation();
    this.setState({ active: false });

    const { port, batchStore } = this.props;
    batchStore.setOutput(port, '0');

    this.isMouseDown = false;

    // unbinding mouseup listener
    window.removeEventListener('mouseup', this.onMouseUp);
  };

  render() {
    const { active } = this.state;
    const className = cx('device-gui__push-button', {
      'device-gui__push-button--active': active
    });
    const allowedProps = pick(this.props, ['bsStyle', 'bsSize']);

    return (
      <Button
        bsSize="sm"
        bsStyle="primary"
        className={className}
        {...allowedProps}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      >
        {this.props.children || <i className="fa fa-arrow-down" />}
      </Button>
    );
  }
}

PushButton.propTypes = {
  port: PropTypes.number.isRequired,
  onPush: PropTypes.func
};

PushButton.defaultProps = {
  port: 0
};

export default PushButton;
