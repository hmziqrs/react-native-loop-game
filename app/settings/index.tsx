import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { router } from "expo-router";
import Slider from "@react-native-community/slider";
import { TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import { MP3S, MP3Type, useSettings } from "@/contexts/Settings";
import { THEMES, useTheme } from "@/contexts/Theme";
import { Player } from "./player";
import { PageView } from "@/components/PageView";
import { SettingsAnalytics } from "./analytics";
import { useScreenTracking } from "@/hooks/useScreenTracking";
import { useScrollTracking } from "@/hooks/useScrollTracking";

export default function Settings() {
  const { volume, setVolume, currentTrack, playAudio, pauseAudio } =
    useSettings();
  const { theme, setTheme } = useTheme();
  const { colorScheme } = useColorScheme();
  const [activeTrack, setActiveTrack] = useState(-1);

  // Use screen tracking hook
  useScreenTracking({
    trackScreenView: SettingsAnalytics.trackScreenView,
    trackScreenExit: SettingsAnalytics.trackScreenExit,
  });

  // Use scroll tracking hook
  const { handleScroll } = useScrollTracking({
    trackScrollDepth: (depth) => {
      // If you want to track scroll depth in settings, add it to analytics.ts first
    },
  });

  // Handle volume changes
  const handleVolumeChange = (newVolume: number) => {
    SettingsAnalytics.trackVolumeChange(volume, newVolume);
    setVolume(newVolume);
  };

  // Handle theme changes
  const handleThemeChange = (newTheme: string) => {
    SettingsAnalytics.trackThemeChange(theme, newTheme);
    setTheme(newTheme as any);
  };

  return (
    <PageView
      header={{
        title: "Settings",
        icon: "arrow-left",
        onLeft: () => router.back(),
      }}
    >
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Volume Section */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-primary mb-2">
              Volume: {Math.round(volume * 100)}%
            </Text>
            <Slider
              step={0.01}
              minimumValue={0}
              maximumValue={1}
              value={volume}
              onValueChange={handleVolumeChange}
              minimumTrackTintColor="#007AFF"
              thumbTintColor={colorScheme === "dark" ? "#fff" : "#000"}
              maximumTrackTintColor={
                colorScheme === "dark"
                  ? "rgba(255, 255, 255, 0.3)"
                  : "rgba(0, 0, 0, 0.3)"
              }
              className="h-8"
            />
          </View>

          {/* Sound Tracks Section */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-primary mb-2">
              Sound Track: {currentTrack.replace(".mp3", "")}
            </Text>
            {Object.entries(MP3S).map(([key, mp3], index) => (
              <Player
                key={key}
                mp3={mp3}
                isActive={index === activeTrack}
                toggle={() =>
                  setActiveTrack(index === activeTrack ? -1 : index)
                }
              />
            ))}
          </View>

          {/* Theme Section */}
          <View>
            <Text
              className="text-lg font-semibold text-primary mb-2"
              testID="themeText"
            >
              Theme: {theme}
            </Text>
            {Object.keys(THEMES).map((themeKey) => (
              <TouchableOpacity
                key={themeKey}
                testID={`${themeKey}Theme`}
                className="flex flex-row items-center py-3"
                onPress={() => handleThemeChange(themeKey)}
              >
                <View
                  className="w-5 h-5 rounded-full border-2 border-primary
                flex items-center justify-center mr-3"
                >
                  {themeKey === theme && (
                    <View className="w-3 h-3 rounded-full bg-primary" />
                  )}
                </View>
                <Text className="text-base text-zinc-900 dark:text-zinc-100">
                  {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </PageView>
  );
}
