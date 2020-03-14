import { StyleSheet } from 'react-native';

import { colors } from 'configs';

const styles = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark.alpha(0.4).string(),
  },
});

export default styles;
