import React from "react";
import { View, Animated, StyleSheet } from "react-native";
import { BoxType } from "../types";

interface GameShapeProps {
  type: BoxType;
  size: number;
  animation: Animated.Value;
  animateColor: (color: string) => string;
  success: boolean;
}

export function GameShape({
  type,
  size,
  animation,
  animateColor,
  success,
}: GameShapeProps) {
  const rotate = animation.interpolate({
    inputRange: [0, 4],
    outputRange: ["0deg", "360deg"],
  });

  const stroke = 6;
  const styles = getStyles(size, stroke, animateColor("accent"));

  const renderArc = (rotation = 1) => {
    const arcOffsets = {
      1: { y: -1, x: 1 },
      2: { y: 1, x: 1 },
      3: { y: 1, x: -1 },
      4: { y: -1, x: -1 },
    };

    const offset = size / 2;
    const arcStyle = {
      ...styles.arcBase,
      marginTop: offset * arcOffsets[rotation].y,
      marginLeft: offset * arcOffsets[rotation].x,
    };

    return <Animated.View style={arcStyle} />;
  };

  const renderContent = () => {
    switch (type) {
      case "line":
        return <Animated.View style={styles.line} />;

      case "1-point":
        return (
          <>
            <Animated.View style={styles.miniCircle} />
            <Animated.View style={styles.miniLine} />
          </>
        );

      case "2-point":
        return renderArc();

      case "3-point":
        return (
          <>
            {renderArc(2)}
            {renderArc()}
          </>
        );

      case "4-point":
        return (
          <>
            {renderArc()}
            {renderArc(2)}
            {renderArc(3)}
            {renderArc(4)}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ rotate }],
        },
      ]}
    >
      {renderContent()}
    </Animated.View>
  );
}

const getStyles = (size: number, stroke: number, color: string) =>
  StyleSheet.create({
    container: {
      width: size,
      height: size,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
    },
    arcBase: {
      position: "absolute",
      width: size + stroke,
      height: size + stroke,
      borderWidth: stroke,
      borderRadius: size,
      borderColor: color,
      backgroundColor: "transparent",
      top: -stroke / 2,
      left: -stroke / 2,
    },
    line: {
      position: "absolute",
      backgroundColor: color,
      width: stroke,
      height: size,
      left: (size - stroke) / 2,
    },
    miniCircle: {
      width: size / 2 + stroke,
      height: size / 2 + stroke,
      borderWidth: stroke,
      borderRadius: 100,
      borderColor: color,
      backgroundColor: "transparent",
    },
    miniLine: {
      position: "absolute",
      backgroundColor: color,
      width: stroke,
      height: size * 0.21,
      left: (size - stroke) / 2,
    },
  });
