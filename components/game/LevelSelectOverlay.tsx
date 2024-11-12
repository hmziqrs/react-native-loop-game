import React from "react";
import { View, Animated, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Theme } from "../../types";
import { useAnimation } from "../../hooks/useAnimation";

interface LevelSelectOverlayProps {
  level: number;
  theme: Theme;
  onNext: () => void;
  onPrev: () => void;
  isVisible: boolean;
  onClose: () => void;
}

export function LevelSelectOverlay({
  level,
  theme,
  onNext,
  onPrev,
  isVisible,
  onClose,
}: LevelSelectOverlayProps) {
  const router = useRouter();
  const { value: fadeAnim } = useAnimation();
  const { value: slideAnim } = useAnimation();

  React.useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  return (
    <Animated.View
      className="absolute inset-0 bg-black/50"
      style={{ opacity: fadeAnim }}
    >
      <Pressable className="absolute inset-0" onPress={onClose} />

      <Animated.View
        className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-2xl"
        style={{
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [300, 0],
              }),
            },
          ],
        }}
      >
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-6">
            <Pressable onPress={() => router.back()} className="p-2">
              <MaterialIcons
                name="close"
                size={24}
                color={theme.light.accent.toString()}
              />
            </Pressable>

            <Text
              className="text-xl font-bold"
              style={{ color: theme.light.accent.toString() }}
            >
              Level {level}
            </Text>

            <View className="w-10" />
          </View>

          <View className="flex-row justify-around mb-8">
            <Pressable onPress={onPrev} className="items-center">
              <MaterialIcons
                name="chevron-left"
                size={32}
                color={theme.light.accent.toString()}
              />
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Previous
              </Text>
            </Pressable>

            <Pressable onPress={onNext} className="items-center">
              <MaterialIcons
                name="chevron-right"
                size={32}
                color={theme.light.accent.toString()}
              />
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Next
              </Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}
