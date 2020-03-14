import { LayoutAnimation } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { colors } from 'configs';

export function alert(type, props) {
  let backgroundColor = colors.linkedin.string();
  if (type === 'error') {
    backgroundColor = colors.error.string();
  } else if (type === 'success') {
    backgroundColor = colors.success.string();
  }
  showMessage({
    backgroundColor,
    ...props,
  });
}

export const animationConfig = {
  duration: 200,
  create: {
    duration: 200,
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    duration: 200,
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  delete: {
    duration: 200,
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
};

export const initLayout = () => LayoutAnimation.configureNext(animationConfig);
