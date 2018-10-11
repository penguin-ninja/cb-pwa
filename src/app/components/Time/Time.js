import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Time extends Component {
  constructor() {
    super();
    this.state = {
      time: new Date()
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { format, ...otherProps } = this.props;

    return (
      <span {...otherProps}>{moment(this.state.time).format(format)}</span>
    );
  }
}

Time.propTypes = {
  format: PropTypes.string
};

Time.defaultProps = {
  format: 'MM/DD/YYYY hh:mm A'
};

export default Time;
