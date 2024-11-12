import React from "react";
import { View, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

interface ControlsProps {
  success: boolean;
  onCapture: () => void;
  onReset: () => void;
  onNext: () => void;
  level: number;
  viewRef: React.RefObject<View>;
}

export function Controls({
  success,
  onCapture,
  onReset,
  onNext,
  level,
  viewRef,
}: ControlsProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuAnimation = React.useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    Animated.spring(menuAnimation, {
      toValue: isMenuOpen ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

  const handleCapture = async () => {
    if (viewRef.current) {
      try {
        const uri = await captureRef(viewRef, {
          format: "png",
          quality: 0.8,
        });

        await Sharing.shareAsync(uri, {
          mimeType: "image/png",
          dialogTitle: "Share your achievement!",
        });
      } catch (error) {
        console.error("Failed to capture or share:", error);
      }
    }
  };

  return (
    <View className="absolute bottom-0 left-0 right-0">
      <Animated.View
        style={{
          transform: [
            {
              translateY: menuAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
              }),
            },
          ],
        }}
        className="bg-white dark:bg-gray-800 rounded-t-xl p-4"
      >
        <View className="flex-row justify-around">
          <Pressable onPress={() => router.back()} className="items-center">
            <MaterialIcons
              name="exit-to-app"
              size={24}
              className="text-primary"
            />
            <Text className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              Exit
            </Text>
          </Pressable>

          <Pressable onPress={onReset} className="items-center">
            <MaterialIcons name="refresh" size={24} className="text-primary" />
            <Text className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              Reset
            </Text>
          </Pressable>

          {success && (
            <>
              <Pressable onPress={handleCapture} className="items-center">
                <MaterialIcons
                  name="camera"
                  size={24}
                  className="text-primary"
                />
                <Text className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  Share
                </Text>
              </Pressable>

              <Pressable onPress={onNext} className="items-center">
                <MaterialIcons
                  name="arrow-forward"
                  size={24}
                  className="text-primary"
                />
                <Text className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                  Next
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </Animated.View>

      <Pressable
        onPress={toggleMenu}
        className={cn(
          "w-12 h-12 rounded-full bg-primary",
          "absolute bottom-4 left-1/2 -ml-6",
          "items-center justify-center",
        )}
      >
        <MaterialIcons
          name={isMenuOpen ? "close" : "menu"}
          size={24}
          color="white"
        />
      </Pressable>
    </View>
  );
}
