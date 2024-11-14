import React, { useEffect, useState } from "react";
import { View, Animated, Text, Easing, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { initLayout } from "@/engine/ui";
import { Theme } from "@/engine/types";
import { SafeAreaView } from "react-native-safe-area-context";

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

  // function close() {
  //   init();
  //   setHeader(false);
  //   setTimeout(() => {
  //     setToggle(false);
  //   }, 300);
  // }

  if (!mount) {
    return <View />;
  }

  return (
    <SafeAreaView
      edges={["bottom"]}
      className={`absolute top-0 bottom-16 w-full`}
    >
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
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-14 h-14 items-center justify-center m-2 rounded-full bg-black/30"
            >
              <FontAwesome6 name="arrow-left" className="text-white text-2xl" />
            </TouchableOpacity>
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
              <TouchableOpacity className="w-14 h-14 items-center justify-center m-2 rounded-full bg-black/30">
                <FontAwesome6 name="camera" className="text-white text-2xl" />
              </TouchableOpacity>
              <TouchableOpacity className="w-14 h-14 items-center justify-center m-2 rounded-full bg-black/30">
                <FontAwesome6 name="share" className="text-white text-2xl" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>

        <View className="flex-1 items-center justify-center">
          <Animated.Text
            className="text-2xl font-semibold"
            style={[{ color: theme.light.accent.toString() }]}
          >
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
          <Animated.View
            style={{
              right: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            }}
          >
            <TouchableOpacity onPress={prev}>
              <FontAwesome6
                name="chevron-left"
                className="text-2xl px-4"
                style={[{ color: theme.light.accent.toString() }]}
              />
            </TouchableOpacity>
          </Animated.View>
          <View className="justify-center px-16">
            <Text
              style={[{ color: theme.light.accent.toString() }]}
              className="font-semibold text-2xl"
            >
              #{level}
            </Text>
          </View>
          <Animated.View
            style={{
              left: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            }}
          >
            <TouchableOpacity onPress={next}>
              <FontAwesome6
                name="chevron-right"
                className="text-2xl px-4"
                style={[{ color: theme.light.accent.toString() }]}
              />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}
