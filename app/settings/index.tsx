import React, { useContext, useState } from "react";
import { View, ScrollView } from "react-native";
import { router } from "expo-router";
import Slider from "@react-native-community/slider";
import { TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import { MaterialIcons } from "@expo/vector-icons";

import { SettingsContext, MP3S } from "@/contexts/Settings";
import { ThemeContext, THEMES } from "@/contexts/Theme";
import Player from "./player";

let forcePlay = false;

export default function Settings() {
  const state = useContext(SettingsContext);
  const [volume, setVolume] = useState(state.player.volume);
  const [activeTrack, setTrack] = useState(-1);
  const { theme, setTheme } = useContext(ThemeContext);
  const { colorScheme } = useColorScheme();

  React.useEffect(() => {
    state.player.volume = volume;
  }, [volume]);

  return (
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-900">
      <View className="p-3">
        <TouchableOpacity testID="title" onLongPress={() => router.back()}>
          <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Settings
          </Text>
        </TouchableOpacity>

        <Text className="mt-4 text-lg font-semibold text-primary">
          Volume: {parseInt(String(volume * 100), 10)}
        </Text>

        <Slider
          step={0.1}
          minimumValue={0}
          maximumValue={1}
          className="mt-2"
          value={volume}
          onSlidingStart={() => {
            if (!state.player.isPlaying) {
              forcePlay = true;
              state.player.play();
            }
          }}
          onSlidingComplete={() => {
            if (forcePlay) {
              forcePlay = false;
              state.player.pause();
            }
          }}
          minimumTrackTintColor="#007AFF"
          thumbTintColor={colorScheme === "dark" ? "#fff" : "#000"}
          maximumTrackTintColor={colorScheme === "dark" ? "#fff" : "#000"}
          onValueChange={setVolume}
        />

        <Text className="mt-4 text-lg font-semibold text-primary">
          MP3 Track: {state.mp3.replace(".mp3", "")}
        </Text>

        {Object.entries(MP3S).map(([key, mp3], index) => (
          <Player
            key={key}
            mp3={mp3}
            state={state}
            isActive={index === activeTrack}
            updateParent={() => {}}
            toggle={() => setTrack(index === activeTrack ? -1 : index)}
          />
        ))}

        <Text
          className="mt-4 text-lg font-semibold text-primary"
          testID="themeText"
        >
          Theme: {theme}
        </Text>

        {Object.keys(THEMES).map((key) => (
          <TouchableOpacity
            key={key}
            testID={`${key}Theme`}
            className="flex-row items-center py-1 mt-1.5"
            onPress={() => setTheme(key)}
          >
            <View className="w-3 h-3 rounded-full border border-primary items-center justify-center">
              {key === theme && (
                <View className="w-2 h-2 rounded-full bg-primary" />
              )}
            </View>
            <Text className="ml-3 text-sm text-zinc-900 dark:text-zinc-100">
              {key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
