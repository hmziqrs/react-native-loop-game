import { StyleSheet } from 'react-native';
import { isAndroid } from 'rn-hgl/platform';
import { scaling } from 'rn-hgl/utils';

import { colors } from 'configs';

const ICON_SIZE = scaling(3);
const ICON_BASE_SIZE = ICON_SIZE * 1.8;

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: colors.inputBorderColor.string(),
  },
  iconBase: {
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    width: ICON_BASE_SIZE,
    justifyContent: 'center',
  },
  iconImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  icon: {
    fontSize: scaling(2.3),
  },
  input: {
    flex: 1,
    paddingVertical: scaling(isAndroid ? 1 : 1.5),
    paddingHorizontal: scaling(isAndroid ? 1 : 1.5),
  },
  placeholderBase: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    ...StyleSheet.absoluteFillObject,
  },
  placeholder: {
    color: colors.dark.alpha(0.25).string(),
  },
  placeholderWithIcon: {
    left: scaling(isAndroid ? 0 : 1.5),
    marginLeft: scaling(isAndroid ? 1.4 : 0),
  },
});

export default styles;
