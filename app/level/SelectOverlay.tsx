import { useState, useEffect, useMemo } from "react";
import { Animated, View, Easing, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { initLayout } from "@/engine/ui";
import React from "react";

export interface LevelSelectOverlayProps {
  navigation: any; // Consider using proper type from @react-navigation/native
  setToggle: (value: boolean) => void;
  theme: {
    light: {
      primary: any;
      accent: string;
    };
  };
  level: number;
  toggle: boolean;
  next: () => void;
  prev: () => void;
}

export function useLevelSelectOverlay(toggle: boolean) {
  const [mount, setMount] = useState(toggle);
  const [header, setHeader] = useState(false);
  const [animation] = useState(new Animated.Value(0.0));

  useEffect(() => {
    if (toggle) {
      setMount(true);
    }
    Animated.timing(animation, {
      toValue: toggle ? 1.0 : 0.0,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start((e) => {
      if (e.finished && !toggle) {
        setMount(false);
      }
    });
  }, [toggle, animation]);

  return useMemo(
    () => ({
      mount,
      header,
      animation,
      setHeader,
    }),
    [mount, header, animation],
  );
}

export default function LevelSelectOverlay({
  next,
  prev,
  theme,
  level,
  toggle,
  setToggle,
  navigation,
}: LevelSelectOverlayProps) {
  const { animation, mount, header, setHeader } = useLevelSelectOverlay(toggle);

  const init = () => {
    initLayout(600, "spring");
  };

  useEffect(() => {
    init();
    let timeout: NodeJS.Timeout;
    if (toggle) {
      timeout = setTimeout(() => {
        init();
        setHeader(true);
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, [toggle]);

  const close = () => {
    init();
    setHeader(false);
    setTimeout(() => {
      setToggle(false);
    }, 200);
  };

  if (!mount) return null;

  return (
    <TouchableOpacity
      className="absolute inset-0"
      onPress={close}
      activeOpacity={1}
    >
      <Animated.View
        className="flex-1 bg-zinc-900/70"
        style={{ opacity: animation }}
      >
        <Animated.View className="flex-row mt-safe px-2">
          <TouchableOpacity
            onPress={() => navigation.pop()}
            className={`w-9 h-9 items-center justify-center m-2 rounded-full bg-zinc-900/30
              ${header ? "left-0" : "-left-30"}`}
          >
            <Ionicons name="exit" size={20} className="text-white" />
          </TouchableOpacity>

          <View className="flex-1" />

          <View className={`flex-row ${header ? "right-0" : "-right-30"}`}>
            <TouchableOpacity className="w-9 h-9 items-center justify-center m-2 rounded-full bg-zinc-900/30">
              <Ionicons
                name="logo-instagram"
                size={20}
                className="text-white"
              />
            </TouchableOpacity>
            <TouchableOpacity className="w-9 h-9 items-center justify-center m-2 rounded-full bg-zinc-900/30">
              <Ionicons name="logo-facebook" size={20} className="text-white" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View className="flex-1 items-center justify-center">
          <Animated.Text className="font-bold text-2xl text-zinc-100">
            React Native Loop
          </Animated.Text>
        </View>

        <Animated.View
          className="flex-row justify-center pb-12 bg-zinc-900"
          style={{
            opacity: animation,
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [16, 0],
                }),
              },
            ],
          }}
        >
          <TouchableOpacity onPress={prev} className="p-2">
            <Ionicons name="chevron-back" size={40} className="text-zinc-100" />
          </TouchableOpacity>

          <View className="justify-center px-16">
            <Text className="font-semibold text-lg text-zinc-100">
              #{level}
            </Text>
          </View>

          <TouchableOpacity onPress={next} className="p-2">
            <Ionicons
              name="chevron-forward"
              size={40}
              className="text-zinc-100"
            />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
}
