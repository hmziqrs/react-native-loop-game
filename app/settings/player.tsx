import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import { MaterialIcons } from "@expo/vector-icons";
import { MP3Type, useSettings } from "@/contexts/Settings";
import { useTheme } from "@/contexts/Theme";

interface PlayerProps {
  isActive: boolean;
  mp3: MP3Type;
  toggle: () => void;
}

export function Player({ isActive, mp3, toggle }: PlayerProps) {
  const {
    playSound,
    pauseSound,
    isPlaying,
    mp3: currentMp3,
    sound,
    volume,
  } = useSettings();
  const [status, setStatus] = useState({ position: 0, duration: 0 });
  const { colorScheme } = useColorScheme();

  // Update position periodically when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && currentMp3 === mp3) {
      interval = setInterval(async () => {
        if (sound) {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            setStatus({
              position: status.positionMillis,
              duration: status.durationMillis || 0,
            });
          }
        }
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, currentMp3, mp3, sound]);

  const handlePlayPause = async () => {
    if (currentMp3 !== mp3) {
      await playSound(mp3);
    } else if (isPlaying) {
      await pauseSound();
    } else {
      await playSound(mp3);
    }
  };

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <View
      className="border border-zinc-200 dark:border-zinc-700
      rounded-lg overflow-hidden mb-2"
    >
      <TouchableOpacity
        onPress={toggle}
        className="flex-row items-center justify-between p-4"
      >
        <Text
          className={`font-semibold ${
            isActive ? "text-primary" : "text-zinc-900 dark:text-zinc-100"
          }`}
        >
          {mp3.replace(".mp3", "")}
        </Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          className={`transform transition-all duration-300 ${
            isActive
              ? "rotate-180 text-primary"
              : "text-zinc-900 dark:text-zinc-100"
          }`}
        />
      </TouchableOpacity>

      {isActive && (
        <View className="p-4 border-t border-zinc-200 dark:border-zinc-700">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={handlePlayPause}
              className="w-10 h-10 rounded-full bg-primary
                items-center justify-center mr-3"
            >
              <MaterialIcons
                name={isPlaying && currentMp3 === mp3 ? "pause" : "play-arrow"}
                size={24}
                color="white"
              />
            </TouchableOpacity>

            <View className="flex-1">
              <Slider
                minimumValue={0}
                maximumValue={status.duration}
                value={status.position}
                onValueChange={async (value) => {
                  if (sound) {
                    await sound.setPositionAsync(value);
                  }
                }}
                minimumTrackTintColor="#007AFF"
                thumbTintColor={colorScheme === "dark" ? "#fff" : "#000"}
                maximumTrackTintColor={
                  colorScheme === "dark"
                    ? "rgba(255, 255, 255, 0.3)"
                    : "rgba(0, 0, 0, 0.3)"
                }
              />
              <View className="flex-row justify-between mt-1">
                <Text className="text-xs text-zinc-600 dark:text-zinc-400">
                  {formatTime(status.position)}
                </Text>
                <Text className="text-xs text-zinc-600 dark:text-zinc-400">
                  {formatTime(status.duration)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
