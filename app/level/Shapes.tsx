import React from "react";
import { Animated } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BoxType } from "@/engine/types";

export interface ShapeProps {
  id: string;
  size: number;
  animation: Animated.Value;
  type: BoxType;
  setRotate: () => void;
  success: boolean;
  animateColor: (type: "accent") => string;
}

export const Shape: React.FC<ShapeProps> = ({
  id,
  size,
  animation,
  type,
  setRotate,
  success,
  animateColor,
}) => {
  const stroke = 6;

  const rotate = animation.interpolate({
    inputRange: [0, 4],
    outputRange: ["0deg", "360deg"],
  });

  const getArcStyle = (rotation = 1) => {
    const arcOffsets = {
      1: { y: -1, x: 1 },
      2: { y: 1, x: 1 },
      3: { y: 1, x: -1 },
      4: { y: -1, x: -1 },
    };

    const origin = -stroke / 2;
    const offset = size / 2;
    const radius = size + stroke;

    return {
      borderColor: animateColor("accent"),
      width: radius,
      height: radius,
      borderWidth: stroke,
      borderRadius: size,
      top: origin,
      left: origin,
      position: "absolute",
      marginTop: offset * arcOffsets[rotation as keyof typeof arcOffsets].y,
      marginLeft: offset * arcOffsets[rotation as keyof typeof arcOffsets].x,
    };
  };

  const renderArc = (rotation?: number) => (
    <Animated.View style={getArcStyle(rotation) as any} />
  );

  const renderShape = () => {
    switch (type) {
      case "line":
        return (
          <Animated.View
            style={{
              backgroundColor: animateColor("accent"),
              top: 0,
              left: (size - stroke) / 2,
              height: size,
              width: stroke,
            }}
          />
        );

      case "1-point":
        return (
          <>
            <Animated.View
              className="items-center justify-center bg-transparent"
              style={{
                borderWidth: stroke,
                borderRadius: 100,
                borderColor: animateColor("accent"),
                width: size / 2 + stroke,
                height: size / 2 + stroke,
              }}
            />
            <Animated.View
              style={{
                backgroundColor: animateColor("accent"),
                position: "absolute",
                top: 0,
                left: (size - stroke) / 2,
                height: size * 0.21,
                width: stroke,
              }}
            />
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
    <TouchableOpacity
      testID={`block-${id}`}
      onPress={setRotate}
      className="active:opacity-100"
    >
      <Animated.View
        className={`overflow-hidden ${type === "1-point" ? "items-center justify-center" : ""}`}
        style={{
          width: size,
          height: size,
          transform: [{ rotate }],
        }}
      >
        {renderShape()}
      </Animated.View>
    </TouchableOpacity>
  );
};
