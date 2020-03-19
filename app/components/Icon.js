import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

const CommunityIconsAnimated = Animated.createAnimatedComponent(CommunityIcons);
const CommunityIconsAnimatable = Animatable.createAnimatableComponent(CommunityIcons);
const IconsAnimated = Animated.createAnimatedComponent(Icons);

export function Icon({ animated, animatable, type, innerRef, ...props }) {
  let Comp = Icons;
  if (animated) {
    Comp = IconsAnimated;
  }
  if (type === 'community' && !animated && !animatable) {
    Comp = CommunityIcons;
  } else if (type === 'community' && animated) {
    Comp = CommunityIconsAnimated;
  } else if (type === 'community' && animatable) {
    Comp = CommunityIconsAnimatable;
  }

  return <Comp ref={innerRef} {...props} />;
}

Icon.propTypes = {
  animatable: PropTypes.bool,
  animated: PropTypes.bool,
  type: PropTypes.oneOf(['community']),
  innerRef: PropTypes.func,
};
Icon.defaultProps = {
  animatable: false,
  animated: false,
  type: 'community',
  innerRef: () => {},
};

export default Icon;
