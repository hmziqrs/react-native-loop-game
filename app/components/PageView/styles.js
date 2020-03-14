/**
 *
 * PageView Styles
 *
 */

import { StyleSheet } from 'react-native';

import { colors } from 'configs';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  base: {
    flex: 1,
    backgroundColor: colors.white,
  },
  gradientBackground: {
    backgroundColor: colors.dark.alpha(0.01),
  },
});

export default styles;
