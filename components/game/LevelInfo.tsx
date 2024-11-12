import React from "react";
import { Animated } from "react-native";
import { Theme } from "../../types";

interface LevelInfoProps {
  level: number;
  theme: Theme;
  success: boolean;
}

export function LevelInfo({ level, theme, success }: LevelInfoProps) {
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [level]);

  return (
    <Animated.View
      className="absolute top-safe-area"
      style={{ opacity: fadeAnim }}
    >
      <Text
        className="text-2xl font-bold text-center"
        style={{
          color: success
            ? theme.dark.accent.toString()
            : theme.light.accent.toString(),
        }}
      >
        Level {level}
      </Text>
    </Animated.View>
  );
}
