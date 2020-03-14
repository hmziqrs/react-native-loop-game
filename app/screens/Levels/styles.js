import { StyleSheet } from 'react-native';
import { scaling } from 'rn-hgl/utils';
import { typography } from 'configs';

import level from 'engine/levels/level-1';
import { dimensions, platform } from 'rn-hgl';
import { elevation } from 'rn-hgl/styles';

const { theme } = level;

const styles = StyleSheet.create({
  container: {
    padding: scaling(1),
    backgroundColor: theme.light.primary,
  },
  title: {
    margin: scaling(1),
    fontSize: typography.heading1,
  },
  levelsHolder: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  levelBase: {
    borderWidth: 2,
    borderRadius: 5,
    margin: scaling(2),
    paddingVertical: scaling(3),
    width: dimensions.width / 5,
    borderColor: theme.light.accent,
    backgroundColor: theme.light.primary,
    ...elevation(platform.isIOS ? 2.5 : 5),
  },
  levelText: {
    fontWeight: '700',
    textAlign: 'center',
    color: theme.light.accent,
    fontSize: typography.label1,
  },
});

export default styles;
