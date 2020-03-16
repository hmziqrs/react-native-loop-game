import { StyleSheet } from 'react-native';
import { scaling, dimensions } from 'rn-hgl';

import { colors, typography } from 'configs';

const styles = StyleSheet.create({
  transparent: {
    backgroundColor: colors.transparent,
  },
  currentLevel: {
    textAlign: 'center',
    position: 'absolute',
    fontSize: typography.heading3,
    top: dimensions.statusBarHeight + scaling(2),
  },
  row: {
    flexDirection: 'row',
  },
  gridContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  watermark: {
    fontWeight: '600',
    bottom: scaling(4),
    textAlign: 'center',
    position: 'absolute',
    fontSize: typography.body3,
  },
  captureBase: {
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    paddingBottom: scaling(4),
  },
  capture: {
    alignSelf: 'center',
    padding: scaling(3),
  },
  captureIcon: {
    fontSize: scaling(8),
  },
  nextLevel: {
    marginTop: scaling(4),
  },
  blockBase: {
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    top: dimensions.height,
    backgroundColor: colors.transparent,
  },
  blockVisible: {
    top: 0,
  },
});

export default styles;
