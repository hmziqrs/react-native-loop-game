import { StyleSheet } from 'react-native';
import { scaling, dimensions } from 'rn-hgl';

import { colors, typography } from 'configs';

import { getFont } from 'utils/fonts';

const styles = StyleSheet.create({
  base: {
    ...StyleSheet.absoluteFillObject,
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    marginTop: dimensions.statusBarHeight,
    paddingHorizontal: scaling(2),
  },
  headerLeftEnable: {
    left: 0,
  },
  headerLeftDisable: {
    left: scaling(-30),
  },
  headerRightEnable: {
    right: 0,
  },
  headerRightDisable: {
    right: scaling(-30),
  },
  roundIconBase: {
    width: scaling(9),
    height: scaling(9),
    alignItems: 'center',
    justifyContent: 'center',
    margin: scaling(2),
    borderRadius: 20,
    backgroundColor: colors.darkBackground.alpha(0.31),
  },
  roundIcon: {
    top: 1,
    left: 0.8,
    color: colors.white,
    fontSize: scaling(5),
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    ...getFont(700),
    fontSize: typography.heading1,
  },
  controlsHolder: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: scaling(12),
  },
  controlTextBase: {
    justifyContent: 'center',
    paddingHorizontal: scaling(16),
  },
  controlText: {
    ...getFont(600),
    fontSize: typography.body1,
  },
  controlButton: {},
  controlButtonIcon: {
    fontSize: scaling(10),
  },
});

export default styles;
