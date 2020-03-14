import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';

import style from './style';

function Modal(props) {
  const [view] = useState(props.active || false);
  const animation = new Animated.Value(0);
  const toValue = 1;

  if (props.active) {
    runAnimation();
  }

  function runAnimation(callback = null) {
    Animated.timing(animation, {
      toValue,
      useNativeDriver: true,
      duration: props.duration,
    }).start(({ finished }) => {
      if (callback) {
        callback();
      }
      if (finished) {
        props.callback();
      }
    });
  }

  useEffect(() => {});

  return (
    <Animated.View style={[style.container, style, { opacity: animation }]}>
      {isFunction(props.children) ? props.children(view) : props.children}
    </Animated.View>
  );
}

Modal.propTypes = {
  // style: PropTypes.any.isRequired,
  duration: PropTypes.number,
  callback: PropTypes.func,
  children: PropTypes.any,
  active: PropTypes.bool,
};

Modal.defaultProps = {
  callback: () => {},
  children: null,
  active: false,
  duration: 180,
};

export default Modal;
