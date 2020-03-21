/**
 *
 * PageView Styles
 *
 */

import { StyleSheet } from 'react-native';
import { dimensions, platform } from 'rn-hgl';

import { colors } from 'configs';

export const MAX_WIDTH = dimensions.width > 650 ? 650 : dimensions.width;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    paddingTop: platform.isAndroid ? dimensions.statusBarHeight : 0,
  },
  maxContainer: {
    maxWidth: MAX_WIDTH,
    marginLeft: dimensions.width / 2 - MAX_WIDTH / 2,
  },
  gradientBackground: {
    backgroundColor: colors.dark.alpha(0.01),
  },
});

export default styles;
