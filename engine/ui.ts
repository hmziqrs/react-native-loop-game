import { Dimensions, LayoutAnimation, LayoutAnimationType } from "react-native";
const dimensions = Dimensions.get("window");

import * as constants from "./constants";

export function getWidth() {
  return dimensions.width > constants.MAX_WIDTH
    ? constants.MAX_WIDTH
    : dimensions.width;
}

export function getHeight() {
  return dimensions.height > constants.MAX_HEIGHT
    ? constants.MAX_HEIGHT
    : dimensions.height;
}

export function getGrid() {
  const boxSize = getWidth() / 2;

  return {
    boxSize,
  };
}

export const initLayout = (
  duration: number = 200,
  type: LayoutAnimationType = "linear",
) => {
  if (type === "spring") {
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
