import React from "react";
import { View, Animated, Pressable, Text } from "react-native";
// import { useAnimatedValue } from "@/hooks/useAnimatedValue";
import { SettingsContextType } from "@/contexts/Settings";

interface AudioPlayerProps {
  mp3: string;
  isActive: boolean;
  onToggle: () => void;
  settings: SettingsContextType;
}

export function AudioPlayer({
  mp3,
  isActive,
  onToggle,
  settings,
}: AudioPlayerProps) {
  const animation = new Animated.Value(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  const togglePlay = async () => {
    if (settings.mp3 !== mp3) {
      await settings.setPlayer(mp3, true, true);
      setIsPlaying(true);
    } else if (isPlaying) {
      await settings.player?.pauseAsync();
      setIsPlaying(false);
    } else {
      await settings.player?.playAsync();
      setIsPlaying(true);
    }
  };

  const renderIcon = (name: string, size: number, color: string) => {
    // Implement your icon rendering logic here
    return null;
  };

  const renderProgress = (progress: any, isPlaying: boolean) => {
    // Implement your progress rendering logic here
    return null;
  };

  return (
    <Pressable
      onPress={onToggle}
      className="mb-2 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <View className="p-4 flex-row items-center justify-between">
        <Text className="text-gray-900 dark:text-white">
          {mp3.replace(".mp3", "")}
        </Text>
        {renderIcon(
          isActive ? "chevron-up" : "chevron-down",
          24,
          "rgb(var(--color-primary))",
        )}
      </View>

      <Animated.View
        style={{
          height: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 80],
          }),
        }}
      >
        <View className="p-4 flex-row items-center">
          <Pressable
            onPress={togglePlay}
            className="w-10 h-10 rounded-full bg-primary items-center justify-center"
          >
            {renderIcon(isPlaying ? "pause" : "play", 24, "white")}
          </Pressable>

          <View className="flex-1 mx-4">
            {renderProgress(
              settings.mp3 === mp3 ? settings.player?.getStatusAsync() : 0,
              isPlaying,
            )}
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}
