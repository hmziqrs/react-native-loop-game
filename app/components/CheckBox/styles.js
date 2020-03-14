import { StyleSheet } from 'react-native';
import { scaling } from 'rn-hgl/utils';

import { colors } from 'configs';

const SIZE = scaling(3.5);

const styles = StyleSheet.create({
  base: {
    width: SIZE,
    height: SIZE,
    borderWidth: 2,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.primary.string(),
  },
  icon: {
    fontSize: scaling(2.8),
  },
});

export default styles;
