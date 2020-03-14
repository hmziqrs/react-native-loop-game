import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { elevation as nativeShadow } from 'rn-hgl/styles';
import { TouchNative, Message } from 'rn-hgl';
import { isIOS } from 'rn-hgl/platform';
import isString from 'lodash/isString';

import styles from './styles';

function Button({ text, style, children, baseStyle, textStyle, elevation, ...props }) {
  let render = children;
  if (text) {
    render = isString(text) ? (
      <Text style={[styles.text].concat(textStyle)}>{text}</Text>
    ) : (
      <Message style={[styles.text].concat(textStyle)} {...text} />
    );
  }
  if (isIOS) {
    return (
      <TouchNative
        style={[styles.base, styles.button, elevation ? nativeShadow(elevation) : {}]
          .concat(baseStyle)
          .concat(style)}
        {...props}
      >
        {render}
      </TouchNative>
    );
  }
  return (
    <View style={[styles.base, elevation ? nativeShadow(elevation) : {}].concat(baseStyle)}>
      <TouchNative rippleEffect style={[styles.button].concat(style)} {...props}>
        {render}
      </TouchNative>
    </View>
  );
}

Button.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  elevation: PropTypes.number,
  baseStyle: PropTypes.any,
  textStyle: PropTypes.any,
  children: PropTypes.any,
  style: PropTypes.any,
};

Button.defaultProps = {
  elevation: null,
  children: null,
  baseStyle: {},
  textStyle: {},
  text: null,
  style: {},
};

export default Button;
