import { LayoutAnimation } from 'react-native';

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
