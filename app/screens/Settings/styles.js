import { StyleSheet } from 'react-native';
import { scaling } from 'rn-hgl/utils';

import { typography, colors } from 'configs';
import { getFont } from 'utils/fonts';

const styles = StyleSheet.create({
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
});

export default styles;
