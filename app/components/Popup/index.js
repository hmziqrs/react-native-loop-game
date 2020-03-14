import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';

import styles from './styles';

class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props;
    if (active && active !== prevProps.active) {
      this.init();
    }
    if (!active && active !== prevProps.active && !!this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
      // eslint-disable-next-line
      this.setState({ active: false });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  init = () => {
    this.setState({ active: true }, () => {
      this.timeout = setTimeout(() => {
        this.setState({ active: false }, () => {
          clearTimeout(this.timeout);
          this.timeout = null;
        });
      }, this.props.duration);
    });
  };

  render() {
    const { children, style, active, callback, duration, ...props } = this.props;
    return (
      <Modal
        {...props}
        active={this.state.active}
        style={[styles.base].concat(style)}
        callback={!this.state.active ? () => this.props.callback() : () => {}}
      >
        {children}
      </Modal>
    );
  }
}

Popup.propTypes = {
  children: PropTypes.any.isRequired,
  active: PropTypes.bool.isRequired,
  callback: PropTypes.func,
  duration: PropTypes.number,
  style: PropTypes.any,
};

Popup.defaultProps = {
  callback: () => {},
  duration: 2000,
  style: {},
};

export default Popup;
