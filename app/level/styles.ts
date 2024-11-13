import { ViewStyle } from "react-native";

interface ArcOffsets {
  [key: number]: {
    y: number;
    x: number;
  };
}

const arcOffsets: ArcOffsets = {
  1: { y: -1, x: 1 },
  2: { y: 1, x: 1 },
  3: { y: 1, x: -1 },
  4: { y: -1, x: -1 },
};

let color: (type: string) => string = () => "";
let success = false;
let size = 0;

const stroke = 6;

export function setData(
  animateColor: (type: string) => string,
  bool: boolean,
  dimensions: number,
): void {
  color = animateColor;
  success = bool;
  size = dimensions;
}

export function box(
  rotate: Animated.AnimatedInterpolation,
  center = false,
): ViewStyle {
  return {
    width: size,
    height: size,
    overflow: "hidden",
    alignItems: center ? "center" : undefined,
    justifyContent: center ? "center" : undefined,
    transform: [
      {
        rotate,
      },
    ],
  };
}

export function arcBase(type: number = 1): ViewStyle {
  const origin = -stroke / 2;
  const offset = size / 2;
  const radius = size + stroke;

  return {
    borderColor: color("accent"),
    backgroundColor: "transparent",
    width: radius,
    height: radius,
    borderWidth: stroke,
    borderRadius: size,
    top: origin,
    left: origin,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    marginTop: offset * arcOffsets[type].y,
    marginLeft: offset * arcOffsets[type].x,
  };
}

export function line(): ViewStyle {
  return {
    backgroundColor: color("accent"),
    top: 0,
    left: (size - stroke) / 2,
    height: size,
    width: stroke,
  };
}

export function miniLineBase(): ViewStyle {
  return {
    ...line(),
    height: size * 0.21,
    position: "absolute",
  };
}

export function miniCircleBase(): ViewStyle {
  const radius = size / 2;
  return {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: stroke,
    borderRadius: 100,
    borderColor: color("accent"),
    backgroundColor: "transparent",
    width: radius + stroke,
    height: radius + stroke,
  };
}
