import { StyleSheet } from 'react-native';
import { dimensions, platform, scaling } from 'rn-hgl';
import { elevation } from 'rn-hgl/styles';

import { colors, typography } from 'configs';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  base: {
    zIndex: 2,
    padding: scaling(3),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    ...elevation(platform.isIOS ? 3 : 5),
    paddingTop: scaling(3) + dimensions.statusBarHeight,
  },
  iconBase: {
    width: scaling(7),
    height: scaling(7),
    position: 'absolute',
    alignItems: 'center',
    marginLeft: scaling(2),
    justifyContent: 'center',
    top: scaling(2.5 + (platform.isIOS ? 0 : 0.5)) + dimensions.statusBarHeight,
  },
  iconBaseRight: {
    marginLeft: scaling(platform.isIOS ? 0 : 2),
  },
  icon: {
    color: colors.black,
    fontSize: scaling(8),
    marginTop: -scaling(0.5),
  },
  title: {
    fontSize: typography.body2,
  },
  titleWithIcon: {
    marginLeft: scaling(8),
  },
  subTitle: {
    color: colors.white.alpha(0.7).string(),
  },
});

export default styles;
