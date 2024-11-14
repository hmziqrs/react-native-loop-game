import React, { useEffect, useState } from "react";
import { View, Animated, Text, Pressable, Easing } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
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
  const [mount, setMount] = useState(toggle);
  const [header, setHeader] = useState(false);
  const [animation] = useState(new Animated.Value(0.0));

  console.log("Overlay Hook", toggle);

  useEffect(() => {
    if (toggle) {
      setMount(true);
    }
    Animated.timing(animation, {
      toValue: toggle ? 1.0 : 0.0,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start((e) => {
      if (e.finished && !toggle) {
        setMount(false);
      }
    });
  }, [toggle, animation]);

  const init = () => initLayout(600, "spring");

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
    }, 300);
  }

  if (!mount) {
    return <View />;
  }

  return (
    <View className="absolute 100 inset-0 w-full h-full z-40">
      <Animated.View
        style={[
          {
            flex: 1,
            opacity: animation,
            backgroundColor: theme.light.primary.alpha(0.7).toString(),
          },
        ]}
      >
        <View className="flex-row mt-10 px-2">
          <Animated.View
            style={{
              right: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [24, 0],
              }),
            }}
          >
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
          </Animated.View>
          <View className="flex-1" />
          <Animated.View
            style={{
              left: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            }}
          >
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
        </View>

        <View className="flex-1 items-center justify-center">
          <Animated.Text style={[{ color: theme.light.accent.toString() }]}>
            React Native Loop
          </Animated.Text>
        </View>

        <Animated.View
          style={[
            {
              flexDirection: "row",
              paddingVertical: 16,
              justifyContent: "space-between",
              backgroundColor: theme.light.primary.toString(),
              opacity: animation,
              top: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 0],
              }),
            },
          ]}
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
    </View>
  );
}
