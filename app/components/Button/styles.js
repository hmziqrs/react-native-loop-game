import { StyleSheet } from 'react-native';
import { scaling } from 'rn-hgl';
import { colors } from 'configs';

const styles = StyleSheet.create({
  base: {
    borderRadius: 4,
    backgroundColor: colors.accent.string(),
  },
  button: {
    alignItems: 'center',
    padding: scaling(2.4),
    justifyContent: 'center',
  },
  text: {
    color: colors.white.string(),
  },
});

export default styles;
