import React, { useEffect } from "react";
import { View, Animated } from "react-native";
import { TouchNative, scaling } from "rn-hgl";
import { router } from "expo-router";
import { initLayout } from "utils/ui";
import { Text } from "components/Text";
import { Icon } from "components/Icon";
import useHook from "./hook";

interface Theme {
  light: {
    primary: any; // Replace with proper color type from your theme
    accent: any;
  };
}

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
    <TouchNative noFeedback className="absolute inset-0" onPress={close}>
      <Animated.View
        style={[
          {
            flex: 1,
            opacity: animation,
            backgroundColor: theme.light.primary.alpha(0.7),
          },
        ]}
      >
        <Animated.View className="flex-row mt-10 px-2">
          <TouchNative
            onPress={() => router.back()}
            style={[header ? { left: 0 } : { left: scaling(-30) }]}
            className="w-9 h-9 items-center justify-center m-2 rounded-full bg-black/30"
          >
            <Icon
              name="exit-to-app"
              className="text-white text-xl top-[1px] left-[0.8px]"
            />
          </TouchNative>
          <View className="flex-1" />
          <View
            style={[header ? { right: 0 } : { right: scaling(-30) }]}
            className="flex-row"
          >
            <TouchNative className="w-9 h-9 items-center justify-center m-2 rounded-full bg-black/30">
              <Icon
                name="instagram"
                className="text-white text-xl top-[1px] left-[0.8px]"
              />
            </TouchNative>
            <TouchNative className="w-9 h-9 items-center justify-center m-2 rounded-full bg-black/30">
              <Icon
                name="facebook"
                className="text-white text-xl top-[1px] left-[0.8px]"
              />
            </TouchNative>
          </View>
        </Animated.View>

        <View className="flex-1 items-center justify-center">
          <Animated.Text
            style={[{ color: theme.light.accent }]}
            className="font-bold text-2xl"
          >
            React Native Loop
          </Animated.Text>
        </View>

        <Animated.View
          style={[
            {
              backgroundColor: theme.light.primary,
              opacity: animation,
              top: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [scaling(16), 0],
              }),
            },
          ]}
          className="flex-row justify-center pb-12"
        >
          <TouchNative onPress={prev}>
            <Icon
              name="chevron-left"
              style={[{ color: theme.light.accent }]}
              className="text-4xl"
            />
          </TouchNative>
          <View className="justify-center px-16">
            <Text
              style={[{ color: theme.light.accent }]}
              className="font-semibold text-base"
            >
              #{level}
            </Text>
          </View>
          <TouchNative onPress={next}>
            <Icon
              name="chevron-right"
              style={[{ color: theme.light.accent }]}
              className="text-4xl"
            />
          </TouchNative>
        </Animated.View>
      </Animated.View>
    </TouchNative>
  );
}
