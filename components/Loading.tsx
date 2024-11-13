import React from "react";
import { View, Animated } from "react-native";
import { useAnimation } from "../hooks/useAnimation";

interface LoadingProps {
  size?: number;
  color?: string;
}

export function Loading({ size = 40, color = "#1565C0" }: LoadingProps) {
  const { value: rotation } = useAnimation(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
    ).start();
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 10,
          borderColor: color,
          borderTopColor: "transparent",
          transform: [
            {
              rotate: rotation.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"],
              }),
            },
          ],
        }}
      />
    </View>
  );
}
