import { StyleSheet } from 'react-native';
import { scaling, dimensions } from 'rn-hgl';

import { colors, typography } from 'configs';
import { getFont } from 'utils/fonts';

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
  captureBase: {
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    paddingBottom: scaling(5),
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
  watermark: {
    left: 0,
    right: 0,
    bottom: scaling(6),
    position: 'absolute',
  },
  watermarkText: {
    ...getFont(600),
    fontSize: typography.heading3,
    textAlign: 'center',
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
