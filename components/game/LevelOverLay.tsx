import React from "react";
import { View, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAnimation } from "../../hooks/useAnimation";

interface LevelOverlayProps {
  level: number;
  success: boolean;
  isVisible: boolean;
  onNext: () => void;
}

export function LevelOverlay({
  level,
  success,
  isVisible,
  onNext,
}: LevelOverlayProps) {
  const { value: overlayAnim, spring } = useAnimation(0);

  React.useEffect(() => {
    if (isVisible) {
      spring({ toValue: 1, useNativeDriver: true });
    } else {
      spring({ toValue: 0, useNativeDriver: true });
    }
  }, [isVisible]);

  if (!success) return null;

  return (
    <Animated.View
      className="absolute inset-0 bg-black/50"
      style={{
        opacity: overlayAnim,
      }}
    >
      <View className="flex-1 items-center justify-center">
        <Animated.View
          style={{
            transform: [
              {
                scale: overlayAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
          }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 w-4/5 max-w-sm"
        >
          <Text className="text-2xl font-bold text-center text-primary mb-4">
            Level {level} Complete!
          </Text>

          <View className="flex-row justify-center space-x-4">
            <Pressable
              onPress={onNext}
              className={cn(
                "flex-row items-center justify-center",
                "bg-primary rounded-lg px-6 py-3",
              )}
            >
              <Text className="text-white font-medium mr-2">Next Level</Text>
              <MaterialIcons name="arrow-forward" size={20} color="white" />
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}
