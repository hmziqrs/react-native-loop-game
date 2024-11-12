import React from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useSettings } from "@/contexts/Settings";

interface AudioPlayerProps {
  title: string;
  track: string;
  isActive: boolean;
}

export function AudioPlayer({ title, track, isActive }: AudioPlayerProps) {
  const { player, mp3, setMp3 } = useSettings();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(1);

  React.useEffect(() => {
    if (player) {
      player.setVolumeAsync(volume);
    }
  }, [volume, player]);

  React.useEffect(() => {
    if (mp3 === track) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [mp3, track]);

  const handlePlay = async () => {
    if (isPlaying) {
      await player.stopAsync();
      setIsPlaying(false);
    } else {
      await player.unloadAsync();
      await player.loadAsync({ uri: track });
      await player.playAsync();
      setIsPlaying(true);
      setMp3(track);
    }
  };

  return (
    <View className="flex-row items-center">
      <Pressable onPress={handlePlay} className="flex-row items-center">
        <MaterialIcons
          name={isPlaying ? "pause" : "play-arrow"}
          size={24}
          color={isActive ? "#cc2f2c" : "#000000"}
        />
        <Text className="text-base text-gray-900 dark:text-white ml-2">
          {title}
        </Text>
      </Pressable>

      <Slider
        value={volume}
        onValueChange={setVolume}
        style={{ width: 100, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        step={0.1}
        minimumTrackTintColor="#cc2f2c"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
}
