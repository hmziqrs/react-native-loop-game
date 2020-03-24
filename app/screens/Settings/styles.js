import { DynamicStyleSheet, DynamicValue } from 'react-native-dark-mode';
import { scaling } from 'rn-hgl/utils';

import { typography, colors } from 'configs';
import { getFont } from 'utils/fonts';

const styles = new DynamicStyleSheet({
  screen: {
    backgroundColor: new DynamicValue(colors.white, colors.darkBackground),
  },
  container: {
    padding: scaling(3),
  },
  title: {
    ...getFont(700),
    fontSize: typography.heading1,
  },
  heading: {
    ...getFont(600),
    marginTop: scaling(4),
    color: colors.primary,
    fontSize: typography.body2,
  },
  radioBase: {
    flexDirection: 'row',
    marginVertical: scaling(1.5),
    paddingVertical: scaling(1),
  },
  radioLabel: {
    marginLeft: scaling(3),
    fontSize: typography.body3,
  },
});

export default styles;
