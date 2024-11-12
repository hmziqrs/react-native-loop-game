import { useRef, useEffect } from "react";
import { Animated } from "react-native";

interface AnimationConfig {
  toValue: number;
  duration?: number;
  useNativeDriver?: boolean;
}

export function useAnimation(initialValue: number = 0) {
  const animation = useRef(new Animated.Value(initialValue)).current;

  const animate = ({
    toValue,
    duration = 300,
    useNativeDriver = false,
  }: AnimationConfig) => {
    return new Promise<void>((resolve) => {
      Animated.timing(animation, {
        toValue,
        duration,
        useNativeDriver,
      }).start(() => resolve());
    });
  };

  const spring = ({
    toValue,
    useNativeDriver = false,
  }: Omit<AnimationConfig, "duration">) => {
    return new Promise<void>((resolve) => {
      Animated.spring(animation, {
        toValue,
        useNativeDriver,
        friction: 7,
        tension: 40,
      }).start(() => resolve());
    });
  };

  return {
    value: animation,
    animate,
    spring,
  };
}
