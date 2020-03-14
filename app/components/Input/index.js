import React from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { Message } from 'rn-hgl/components';

import Icon from 'components/Icon';
import styles from './styles';

function Input({
  placeholderStyle,
  placeholder,
  iconStyle,
  baseStyle,
  value,
  style,
  icon,
  ...props
}) {
  return (
    <View style={[styles.base].concat(baseStyle)}>
      {!value ? (
        <View style={styles.placeholderBase}>
          <Message
            {...placeholder}
            style={[styles.placeholder, !icon ? styles.placeholderWithIcon : {}].concat(
              placeholderStyle,
            )}
          />
        </View>
      ) : null}
      {icon ? (
        <View style={styles.iconBase}>
          <Icon name={icon} style={[styles.icon].concat(iconStyle)} />
        </View>
      ) : null}
      <TextInput
        {...props}
        value={value}
        underlineColorAndroid="transparent"
        style={[styles.input].concat(style)}
      />
    </View>
  );
}

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  placeholderStyle: PropTypes.any,
  iconStyle: PropTypes.any,
  baseStyle: PropTypes.any,
  icon: PropTypes.string,
  style: PropTypes.any,
};

Input.defaultProps = {
  placeholderStyle: {},
  placeholder: null,
  iconStyle: {},
  baseStyle: {},
  icon: null,
  style: {},
};

export default Input;
