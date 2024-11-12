import React from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import Slider from "@react-native-community/slider";
import { PageView } from "@/components/PageView";
import { useSettings } from "@/contexts/Settings";
import { ThemeMode, useTheme } from "@/contexts/Theme";
import { AudioPlayer } from "@/components/AudioPlayer";

export default function SettingsScreen() {
  const { player, mp3 } = useSettings();
  const { theme, setTheme, isDark } = useTheme();
  const [volume, setVolume] = React.useState(1);

  React.useEffect(() => {
    if (player) {
      player.setVolumeAsync(volume);
    }
  }, [volume, player]);

  return (
    <PageView
      header={{
        title: "Settings",
        icon: "arrow-back",
        onLeft: () => router.back(),
      }}
    >
      <View className="p-4">
        <Text className="text-lg font-semibold text-primary mb-2">
          Volume: {Math.round(volume * 100)}%
        </Text>

        <Slider
          value={volume}
          onValueChange={setVolume}
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={1}
          step={0.1}
          minimumTrackTintColor="#cc2f2c"
          maximumTrackTintColor={isDark ? "#ffffff" : "#000000"}
        />

        <Text className="text-lg font-semibold text-primary mt-6 mb-4">
          Background Music
        </Text>

        <View className="space-y-4">
          {Object.entries(MP3S).map(([key, track]) => (
            <AudioPlayer
              key={key}
              title={key}
              track={track}
              isActive={track === mp3}
            />
          ))}
        </View>

        <Text className="text-lg font-semibold text-primary mt-6 mb-4">
          Theme
        </Text>

        <View className="space-y-4">
          {["default", "light", "dark"].map((themeOption) => (
            <Pressable
              key={themeOption}
              onPress={() => setTheme(themeOption as ThemeMode)}
              className={cn(
                "flex-row items-center p-4 rounded-lg",
                "bg-white dark:bg-gray-800",
                "border-2",
                theme === themeOption ? "border-primary" : "border-transparent",
              )}
            >
              <Text className="text-base text-gray-900 dark:text-white capitalize">
                {themeOption}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </PageView>
  );
}
