import { LayoutAnimation } from 'react-native';
import { dimensions } from 'rn-hgl';

const MAX_CONTAINER_WIDTH = 600;

export function getMaxWidth() {
  if (dimensions.width > MAX_CONTAINER_WIDTH) {
    return MAX_CONTAINER_WIDTH;
  }
  return dimensions.width;
}

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
