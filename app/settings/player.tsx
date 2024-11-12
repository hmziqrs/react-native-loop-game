import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import Slider from "@react-native-community/slider";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

interface PlayerProps {
  isActive: boolean;
  mp3: string;
  toggle: () => void;
  state: any; // Define proper type based on your state structure
  updateParent: () => void;
}

interface PlayerStatus {
  isPlaying: boolean;
  progress: moment.Duration;
}

let intervalState: NodeJS.Timeout;

export default function Player({
  isActive,
  mp3,
  toggle,
  state,
  updateParent,
}: PlayerProps) {
  const [status, setStatus] = useState<PlayerStatus>({
    isPlaying: false,
    progress: moment.duration(0),
  });
  const [mount, setMount] = useState(true);
  const { colorScheme } = useColorScheme();

  const setStatusSafe = (v: Partial<PlayerStatus>) =>
    setStatus((prev) => ({ ...prev, ...v }));

  const runProgressBar = (bool: boolean) => {
    if (bool) {
      intervalState = setInterval(() => {
        setStatusSafe({ progress: moment.duration(state.player.currentTime) });
      }, 200);
    } else {
      clearInterval(intervalState);
    }
  };

  useEffect(() => {
    if (status.isPlaying) {
      runProgressBar(true);
    } else {
      runProgressBar(false);
    }
    return () => clearInterval(intervalState);
  }, [status.isPlaying]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isActive) {
      setMount(true);
    } else {
      timeout = setTimeout(() => setMount(false), 400);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isActive]);

  return (
    <View className="border border-zinc-200 dark:border-zinc-700 rounded-md mt-3">
      <TouchableOpacity
        onPress={toggle}
        className="p-2 px-3 flex-row items-center justify-between"
      >
        <Animatable.Text
          duration={400}
          transition="color"
          className={`font-semibold ${
            isActive ? "text-primary" : "text-zinc-900 dark:text-zinc-100"
          }`}
        >
          {mp3.replace(".mp3", "")}
        </Animatable.Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          className={`${isActive ? "text-primary rotate-180" : "text-zinc-900 dark:text-zinc-100"}`}
        />
      </TouchableOpacity>

      <Animatable.View
        duration={400}
        transition="height"
        className={`h-[1px] bg-zinc-200 dark:bg-zinc-700 ${isActive ? "opacity-100" : "opacity-0"}`}
      />

      <Animatable.View
        className="opacity-0 h-0"
        duration={400}
        animation={
          isActive
            ? {
                0: { opacity: 0, height: 0 },
                1: { opacity: 1, height: 64 },
              }
            : {
                0: { opacity: 1, height: 64 },
                1: { opacity: 0, height: 0 },
              }
        }
      >
        {mount && (
          <View className="p-3 flex-row items-center">
            <TouchableOpacity
              className="w-7 h-7 items-center justify-center rounded-full mr-2"
              onPress={() => {
                if (state.mp3 !== mp3) {
                  state.player.destroy();
                  state.setPlayer(mp3, true, true);
                  updateParent();
                } else if (status.isPlaying) {
                  state.player.pause();
                } else {
                  state.player.play();
                }
                setStatusSafe({ isPlaying: !status.isPlaying });
              }}
            >
              <MaterialIcons
                name={
                  status.isPlaying && state.mp3.indexOf(mp3) > -1
                    ? "pause"
                    : "play-arrow"
                }
                size={28}
                className="text-zinc-900 dark:text-zinc-100"
              />
            </TouchableOpacity>

            <Slider
              disabled={state.mp3.indexOf(mp3) < 0}
              minimumValue={0.0}
              maximumValue={state.player.duration}
              value={status.progress.asMilliseconds()}
              minimumTrackTintColor="#007AFF"
              thumbTintColor={colorScheme === "dark" ? "#fff" : "#000"}
              maximumTrackTintColor={colorScheme === "dark" ? "#fff" : "#000"}
              className="flex-1"
              onSlidingStart={() => runProgressBar(false)}
              onSlidingComplete={() => runProgressBar(true)}
              onValueChange={(val) => state.player.seek(val)}
            />

            <Text className="w-10 text-right">
              {status.progress.minutes()}:{status.progress.seconds()}
            </Text>
          </View>
        )}
      </Animatable.View>
    </View>
  );
}
