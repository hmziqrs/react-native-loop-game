import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import { TouchNative } from 'rn-hgl';

import * as styles from './styles';

export default function Shapes({ size, animation, type, setRotate, success, animateColor }) {
  styles.setData(animateColor, success, size);
  let child = null;
  const rotate = animation.interpolate({
    inputRange: [0, 4],
    outputRange: ['0deg', '360deg'],
  });
  function renderArc(rotation) {
    return <Animated.View style={styles.arcBase(rotation)} />;
  }

  if (type === 'line') {
    child = <Animated.View style={styles.line()} />;
  } else if (type === '1-point') {
    child = (
      <>
        <Animated.View style={styles.miniCircleBase()} />
        <Animated.View style={styles.miniLineBase()} />
      </>
    );
  } else if (type === '2-point') {
    child = renderArc();
  } else if (type === '3-point') {
    child = (
      <>
        {renderArc(2)}
        {renderArc()}
      </>
    );
  } else if (type === '4-point') {
    child = (
      <>
        {renderArc()}
        {renderArc(2)}
        {renderArc(3)}
        {renderArc(4)}
      </>
    );
  }
  return (
    <TouchNative noFeedback onPress={() => setRotate()}>
      <Animated.View style={styles.box(rotate, type === '1-point')}>{child}</Animated.View>
    </TouchNative>
  );
}

Shapes.propTypes = {
  animateColor: PropTypes.func.isRequired,
  setRotate: PropTypes.func.isRequired,
  animation: PropTypes.any.isRequired,
  success: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
