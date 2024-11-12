import { dimensions } from "rn-hgl";

import * as constants from "./constants";

export function getWidth() {
  return dimensions.width > constants.MAX_WIDTH
    ? constants.MAX_WIDTH
    : dimensions.width;
}

export function getHeight() {
  return dimensions.availHeight > constants.MAX_HEIGHT
    ? constants.MAX_HEIGHT
    : dimensions.availHeight;
}

export function getGrid() {
  const boxSize = getWidth() / 2;

  return {
    boxSize,
  };
}
