import { DynamicStyleSheet, DynamicValue } from 'react-native-dark-mode';
import { scaling } from 'rn-hgl';

import { typography, colors } from 'configs';

import { getMaxWidth } from 'utils/ui';
import { getFont } from 'utils/fonts';

const BUTTON_WIDTH = getMaxWidth() / 2 - scaling(4) - 4;

const styles = new DynamicStyleSheet({
  screen: {
    backgroundColor: new DynamicValue(colors.white, colors.darkBackground),
  },
  title: {
    ...getFont(700),
    marginHorizontal: scaling(3),
    fontSize: typography.heading1,
  },
  levelsHolder: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: scaling(1.5),
    marginTop: scaling(2),
    justifyContent: 'center',
  },
  levelBase: {
    borderRadius: 5,
    borderWidth: 1.5,
    width: BUTTON_WIDTH,
    margin: scaling(1.5),
    borderColor: colors.primary,
    paddingVertical: scaling(3),
  },
  levelText: {
    ...getFont(600),
    textAlign: 'center',
    fontSize: typography.label1,
  },
});

export default styles;
