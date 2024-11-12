import { LayoutAnimation } from "react-native";

export const animations = {
  spring: () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  },

  easeInEaseOut: () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  },

  linear: (duration: number = 300) => {
    LayoutAnimation.configureNext({
      duration,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
    });
  },
};
