import React from "react";
import { Animated, Easing } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Theme } from "../../types";

interface SuccessAnimationProps {
  show: boolean;
  theme: Theme;
}

export function SuccessAnimation({ show, theme }: SuccessAnimationProps) {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (show) {
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ),
      ]).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [show]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      className="absolute inset-0 items-center justify-center"
      style={{
        transform: [{ scale: scaleAnim }, { rotate: spin }],
      }}
    >
      <MaterialIcons
        name="star"
        size={100}
        color={theme.dark.accent.toString()}
      />
    </Animated.View>
  );
}
