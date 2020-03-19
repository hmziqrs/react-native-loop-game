import { StyleSheet } from 'react-native';
import { scaling } from 'rn-hgl/utils';

import { colors } from 'configs';
import { getFont } from 'utils/fonts';

const styles = StyleSheet.create({
  playerBase: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.darkBackground.alpha(0.15),
    marginTop: scaling(3),
  },
  playerHeader: {
    padding: scaling(2),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: scaling(3),
    justifyContent: 'space-between',
  },
  playerHeaderText: {
    ...getFont(600),
  },
  playerHeaderIcon: {
    fontSize: scaling(5),
  },
  br: {
    height: 0.0,
    backgroundColor: colors.darkBackground.alpha(0.15),
  },
  brActive: {
    height: 1.0,
  },
  bodyBase: {
    height: 0.0,
    opacity: 0.0,
  },
  bodyContent: {
    padding: scaling(3),
    alignItems: 'center',
    flexDirection: 'row',
  },
  playButton: {
    width: scaling(7),
    height: scaling(7),
    alignItems: 'center',
    marginRight: scaling(2),
    borderRadius: scaling(4),
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: scaling(7),
  },
  bodySlider: {
    flex: 1,
  },
  time: {
    textAlign: 'right',
    width: scaling(10),
  },
});

export default styles;
