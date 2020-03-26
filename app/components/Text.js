import React, { useContext } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import { ThemeContext } from 'contexts/Theme';
import { colors } from 'rn-hgl';

export function NativeText({ children, style, ...props }) {
  const { isDark } = useContext(ThemeContext);

  const themeStyle = { color: isDark ? colors.white : colors.dark };

  return (
    <Text {...props} style={[themeStyle].concat(style)}>
      {children}
    </Text>
  );
}

NativeText.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.any,
};
NativeText.defaultProps = {
  style: {},
};

export default NativeText;
