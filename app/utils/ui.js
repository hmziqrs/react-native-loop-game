import { LayoutAnimation } from 'react-native';

export const initLayout = (duration = 200, type = 'linear') => {
  if (type === 'spring') {
    return LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  return LayoutAnimation.configureNext({
    duration,
    create: {
      duration,
      type: LayoutAnimation.Types[type],
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      duration,
      type: LayoutAnimation.Types[type],
      property: LayoutAnimation.Properties.opacity,
    },
    delete: {
      duration,
      type: LayoutAnimation.Types[type],
      property: LayoutAnimation.Properties.opacity,
    },
  });
};
