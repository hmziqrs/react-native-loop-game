import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CommunityIconsAnimated = Animated.createAnimatedComponent(CommunityIcons);
const IconsAnimated = Animated.createAnimatedComponent(Icons);

export function Icon({ animated, type, innerRef, ...props }) {
  let Comp = Icons;
  if (animated) {
    Comp = IconsAnimated;
  }
  if (type === 'community' && !animated) {
    Comp = CommunityIcons;
  } else if (type === 'community' && animated) {
    Comp = CommunityIconsAnimated;
  }

  return <Comp ref={innerRef} {...props} />;
}

Icon.propTypes = {
  animated: PropTypes.bool,
  type: PropTypes.oneOf(['community']),
  innerRef: PropTypes.func,
};
Icon.defaultProps = {
  animated: false,
  type: 'community',
  innerRef: () => {},
};

export default Icon;
