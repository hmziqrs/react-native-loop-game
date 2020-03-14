import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { Message } from 'rn-hgl/components';
import isString from 'lodash/isString';

import styles from './styles';

function ErrorMessage({ text, style }) {
  const textStyles = [styles.text].concat(style);

  return isString(text) ? (
    <Text style={textStyles}>{text}</Text>
  ) : (
    <Message {...text} style={textStyles} />
  );
}

ErrorMessage.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  style: PropTypes.any,
};

ErrorMessage.defaultProps = {
  style: {},
};

ErrorMessage.defaultProps = {};

export default ErrorMessage;
