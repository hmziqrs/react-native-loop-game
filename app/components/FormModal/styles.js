import { StyleSheet } from 'react-native';
import dimensions from 'rn-hgl/dimensions';
import { elevation } from 'rn-hgl/styles';
import { scaling } from 'rn-hgl/utils';

import { colors, typography } from 'configs';

const styles = StyleSheet.create({
  base: {
    // flexDirection: 'row',
    backgroundColor: colors.dark.alpha(0.6).string(),
  },
  flex: {
    flex: 1,
  },
  scrollBaseTouch: {
    flex: 1,
    marginTop: dimensions.statusBarHeight,
  },
  scrollBase: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: scaling(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainerTouchBase: {
    flexBasis: 1,
    maxWidth: 450,
    width: dimensions.width - scaling(8),
  },
  formContainer: {
    flex: 1,
    maxWidth: 450,
    ...elevation(3),
    borderRadius: 5,
    padding: scaling(3),
    backgroundColor: colors.white.string(),
  },
  title: {
    fontWeight: '500',
    margin: scaling(1),
    fontSize: typography.display6,
  },
  desc: {
    margin: scaling(1),
    fontSize: typography.body1,
  },
  field: {
    margin: scaling(1),
  },
  inputBase: {},
  error: {
    marginTop: scaling(1),
  },
  actionHolder: {
    flexDirection: 'row',
    margin: scaling(1),
    justifyContent: 'flex-end',
  },
  buttonBase: {
    marginLeft: scaling(3),
  },
  button: {
    paddingHorizontal: scaling(3),
  },
});

export default styles;
