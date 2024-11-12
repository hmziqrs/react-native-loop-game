import { Dimensions } from "react-native";
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
