import { StyleSheet } from 'react-native';
import { scaling } from 'rn-hgl/utils';

import { colors, typography } from 'configs';

const RADIO_SIZE = scaling(3.8);

const styles = StyleSheet.create({
  inputBase: {
    marginVertical: scaling(1.2),
  },
  inputBaseMultiline: {
    height: scaling(16),
  },
  label: {
    fontWeight: '500',
    marginTop: scaling(1.5),
    color: colors.white.string(),
  },
  errorText: {
    color: colors.error.string(),
    fontSize: typography.label2,
  },
  radioHolderWithLabel: {
    marginTop: scaling(1),
  },
  radioOptionBase: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scaling(1),
    backgroundColor: colors.alpha,
  },
  radioCircleBase: {
    borderWidth: 2,
    width: RADIO_SIZE,
    height: RADIO_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIO_SIZE * 0.5,
    borderColor: colors.green.string(),
  },
  radioCircle: {
    width: RADIO_SIZE * 0.6,
    height: RADIO_SIZE * 0.6,
    backgroundColor: colors.alpha,
    borderRadius: RADIO_SIZE * 0.3,
  },
  radioCircleActive: {
    backgroundColor: colors.green.string(),
  },
  radioText: {
    marginLeft: scaling(2),
    color: colors.white.string(),
  },
  submitBase: {
    alignSelf: 'center',
    marginTop: scaling(1.2),
  },
  submit: {
    paddingHorizontal: scaling(6),
  },
  submitText: {
    color: colors.white.string(),
  },
});

export default styles;
