import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import { MaterialIcons } from "@expo/vector-icons";
import { MP3Type, useSettings } from "@/contexts/Settings";
import { useTheme } from "@/contexts/Theme";
import { SettingsAnalytics } from "./analytics";

interface PlayerProps {
  isActive: boolean;
  mp3: MP3Type;
  toggle: () => void;
}

export function Player({ isActive, mp3, toggle }: PlayerProps) {
  const {
    playAudio,
    pauseAudio,
    isPlaying,
    currentTrack,
    changeAudio,
    audio,
    volume,
  } = useSettings();
  const [status, setStatus] = useState({ position: 0, duration: 0 });
  const { colorScheme } = useColorScheme();

  // Update position periodically when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && currentTrack === mp3) {
      interval = setInterval(async () => {
        if (audio) {
          const status = await audio.getStatusAsync();
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
  }, [isPlaying, currentTrack, mp3]);

  const handlePlayPause = async () => {
    try {
      if (currentTrack !== mp3) {
        SettingsAnalytics.trackSoundTrackChange(currentTrack, mp3);
        await changeAudio(mp3);
        SettingsAnalytics.trackAudioPlayerInteraction("play", mp3);
        await playAudio();
      } else if (isPlaying) {
        SettingsAnalytics.trackAudioPlayerInteraction("pause", mp3);
        await pauseAudio();
      } else {
        SettingsAnalytics.trackAudioPlayerInteraction("play", mp3);
        await playAudio();
      }
    } catch (error) {
      SettingsAnalytics.trackSettingsError(
        "audio_playback",
        (error as any).message ?? "Unknown error in audio playback",
      );
    }
  };

  const handleSeek = async (value: number) => {
    try {
      if (audio) {
        SettingsAnalytics.trackAudioPlayerInteraction("seek", mp3, value);
        await audio.setPositionAsync(value);
      }
    } catch (error) {
      SettingsAnalytics.trackSettingsError("audio_seek", error.message);
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
                name={
                  isPlaying && currentTrack === mp3 ? "pause" : "play-arrow"
                }
                size={24}
                color="white"
              />
            </TouchableOpacity>

            <View className="flex-1">
              <Slider
                minimumValue={0}
                maximumValue={status.duration}
                value={status.position}
                onValueChange={handleSeek}
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
