import React, { useEffect } from "react";
import { View, Animated, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import useHook from "./overlay.hook";
import { initLayout } from "@/engine/ui";
import { Theme } from "@/engine/types";

interface LevelSelectOverlayProps {
  next: () => void;
  prev: () => void;
  theme: Theme;
  level: number;
  toggle: boolean;
  setToggle: (value: boolean) => void;
}

export default function LevelSelectOverlay({
  next,
  prev,
  theme,
  level,
  toggle,
  setToggle,
}: LevelSelectOverlayProps) {
  const { animation, mount, header, setHeader } = useHook(toggle);
  const init = () => initLayout(600, "spring");

  console.log("toggle", toggle);

  useEffect(() => {
    initLayout();
    let timeout: NodeJS.Timeout;
    if (toggle) {
      timeout = setTimeout(() => {
        init();
        setHeader(true);
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, [toggle]);

  function close() {
    init();
    setHeader(false);
    setTimeout(() => {
      setToggle(false);
    }, 200);
  }

  if (!mount) {
    return <View />;
  }

  return (
    <Pressable className="absolute inset-0" onPress={close}>
      <Animated.View
        style={[
          {
            flex: 1,
            opacity: animation,
            backgroundColor: theme.light.primary.alpha(0.7).toString(),
          },
        ]}
      >
        <Animated.View className="flex-row mt-10 px-2">
          <Pressable
            onPress={() => router.back()}
            style={[header ? { left: 0 } : { left: -30 }]}
            className="w-9 h-9 items-center justify-center m-2 rounded-full bg-black/30"
          >
            <MaterialIcons
              name="exit-to-app"
              className="text-white"
              size={24}
            />
          </Pressable>
          <View className="flex-1" />
          <View
            style={[header ? { right: 0 } : { right: -30 }]}
            className="flex-row"
          >
            <Pressable className="w-9 h-9 items-center justify-center m-2 rounded-full bg-black/30">
              <MaterialIcons name="camera" className="text-white" size={24} />
            </Pressable>
            <Pressable className="w-9 h-9 items-center justify-center m-2 rounded-full bg-black/30">
              <MaterialIcons name="share" className="text-white" size={24} />
            </Pressable>
          </View>
        </Animated.View>

        <View className="flex-1 items-center justify-center">
          <Animated.Text style={[{ color: theme.light.accent.toString() }]}>
            React Native Loop
          </Animated.Text>
        </View>

        <Animated.View
          style={[
            {
              backgroundColor: theme.light.primary.toString(),
              opacity: animation,
              top: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 0],
              }),
            },
          ]}
          className="flex-row justify-center pb-12"
        >
          <Pressable onPress={prev}>
            <MaterialIcons
              name="chevron-left"
              style={[{ color: theme.light.accent.toString() }]}
              size={32}
            />
          </Pressable>
          <View className="justify-center px-16">
            <Text
              style={[{ color: theme.light.accent.toString() }]}
              className="font-semibold text-base"
            >
              #{level}
            </Text>
          </View>
          <Pressable onPress={next}>
            <MaterialIcons
              name="chevron-right"
              style={[{ color: theme.light.accent.toString() }]}
              size={32}
            />
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}
