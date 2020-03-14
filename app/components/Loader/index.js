import React from 'react';
import { ActivityIndicator } from 'react-native';

import { colors } from 'configs';

function Loader(props) {
  return <ActivityIndicator size="large" color={colors.accentDark.string()} {...props} />;
}

export default Loader;
