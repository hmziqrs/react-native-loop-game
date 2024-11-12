import React from "react";
import { View, Animated } from "react-native";
import { BoxType } from "../../types";

interface ShapeProps {
  type: BoxType;
  size: number;
  rotate: number;
  animation: Animated.Value;
  success: boolean;
  theme: any; // Replace with proper theme type
}

export function Shape({
  type,
  size,
  rotate,
  animation,
  success,
  theme,
}: ShapeProps) {
  const rotateInterpolation = animation.interpolate({
    inputRange: [0, 4],
    outputRange: ["0deg", "360deg"],
  });

  const color = success ? theme.dark.accent : theme.light.accent;
  const strokeWidth = Math.max(6, size * 0.1);

  const baseStyle = {
    width: size,
    height: size,
    transform: [{ rotate: rotateInterpolation }],
  };

  switch (type) {
    case "line":
      return (
        <Animated.View style={baseStyle}>
          <View
            style={{
              position: "absolute",
              width: strokeWidth,
              height: size,
              backgroundColor: color,
              left: (size - strokeWidth) / 2,
            }}
          />
        </Animated.View>
      );

    case "1-point":
      return (
        <Animated.View
          style={[
            baseStyle,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <View
            style={{
              width: size * 0.4,
              height: size * 0.4,
              borderRadius: size * 0.2,
              borderWidth: strokeWidth,
              borderColor: color,
            }}
          />
          <View
            style={{
              position: "absolute",
              width: strokeWidth,
              height: size * 0.3,
              backgroundColor: color,
            }}
          />
        </Animated.View>
      );

    // Add other shape types...

    default:
      return null;
  }
}
