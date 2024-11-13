import React from "react";
import { Animated } from "react-native";

import * as styles from "./styles";
import { BoxType } from "@/engine/types";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ShapesProps {
  id: string;
  size: number;
  animation: Animated.Value;
  type: BoxType;
  setRotate: () => void;
  success: boolean;
  animateColor: (color: string) => Animated.AnimatedInterpolation<string>;
}

export default function Shapes({
  id,
  size,
  animation,
  type,
  setRotate,
  success,
  animateColor,
}: ShapesProps) {
  styles.setData(animateColor, success, size);
  let child: React.ReactNode = null;

  const rotate = animation.interpolate({
    inputRange: [0, 4],
    outputRange: ["0deg", "360deg"],
  });

  function renderArc(rotation?: number) {
    return <Animated.View style={styles.arcBase(rotation)} />;
  }

  if (type === "line") {
    child = <Animated.View style={styles.line()} />;
  } else if (type === "1-point") {
    child = (
      <>
        <Animated.View style={styles.miniCircleBase()} />
        <Animated.View style={styles.miniLineBase()} />
      </>
    );
  } else if (type === "2-point") {
    child = renderArc();
  } else if (type === "3-point") {
    child = (
      <>
        {renderArc(2)}
        {renderArc()}
      </>
    );
  } else if (type === "4-point") {
    child = (
      <>
        {renderArc()}
        {renderArc(2)}
        {renderArc(3)}
        {renderArc(4)}
      </>
    );
  }

  return (
    <TouchableOpacity testID={`block-${id}`} onPress={setRotate}>
      <Animated.View style={styles.box(rotate, type === "1-point")}>
        {child}
      </Animated.View>
    </TouchableOpacity>
  );
}
