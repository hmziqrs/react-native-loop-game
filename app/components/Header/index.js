import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TouchNative, Message } from 'rn-hgl';
import isString from 'lodash/isString';

import colors from 'rn-hgl/colors';
import styles from './styles';
import Icon from '../Icon';

function Header({ children, title, baseStyle, icon, rightIcon, onRight, onLeft }) {
  let text = null;
  const textStyle = [styles.title, icon ? styles.titleWithIcon : null];
  if (title) {
    text = isString(title) ? (
      <Text style={textStyle}></Text>
    ) : (
      <Message {...title} style={textStyle} />
    );
  }
  return (
    <View style={[styles.base].concat(baseStyle)}>
      {icon ? (
        <TouchNative
          rippleEffect
          onPress={onLeft}
          style={styles.iconBase}
          rippleColor={colors.white.alpha(0.2).string()}
        >
          <Icon name={icon} style={styles.icon} />
        </TouchNative>
      ) : null}
      {text || children}
      <View style={styles.flex} />
      {rightIcon ? (
        <TouchNative
          rippleEffect
          onPress={onRight}
          style={[styles.iconBase, styles.iconBaseRight]}
          rippleColor={colors.white.alpha(0.2).string()}
        >
          <Icon name={rightIcon} style={styles.icon} />
        </TouchNative>
      ) : null}
    </View>
  );
}

Header.propTypes = {
  rightIcon: PropTypes.string,
  baseStyle: PropTypes.any,
  children: PropTypes.any,
  onRight: PropTypes.func,
  onLeft: PropTypes.func,
  icon: PropTypes.string,
  title: PropTypes.any,
};

Header.defaultProps = {
  onRight: () => {},
  onLeft: () => {},
  rightIcon: null,
  children: null,
  baseStyle: {},
  icon: null,
  title: null,
};

export default Header;
