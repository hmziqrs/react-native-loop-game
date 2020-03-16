/**
 *
 * PageView Styles
 *
 */

import { StyleSheet } from 'react-native';
import { dimensions, platform } from 'rn-hgl';

import { colors } from 'configs';

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    paddingTop: platform.isAndroid ? dimensions.statusBarHeight : 0,
  },
  gradientBackground: {
    backgroundColor: colors.dark.alpha(0.01),
  },
});

export default styles;
