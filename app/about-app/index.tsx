import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
  GestureResponderEvent,
  NativeScrollEvent,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Link, links } from "./data";
import { FontAwesome6 } from "@expo/vector-icons";
import { PageView } from "@/components/PageView";
import { router } from "expo-router";
import { AboutAppAnalytics } from "./analytics";

type RootStackParamList = {
  AboutApp: undefined;
  // Add other screens here if needed
};

type AboutAppScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "AboutApp"
>;

function AboutAppScreen() {
  const screenStartTime = useRef(Date.now());
  const lastScrollDepth = useRef(0);
  // Track screen view and exit
  useEffect(() => {
    AboutAppAnalytics.trackScreenView();

    return () => {
      const duration = (Date.now() - screenStartTime.current) / 1000; // Convert to seconds
      AboutAppAnalytics.trackScreenExit(duration);
    };
  }, []);

  // Handle link clicks with analytics
  const handleLinkClick = async (link: Link) => {
    try {
      AboutAppAnalytics.trackLinkClick(link);
      await Linking.openURL(link.url);
    } catch (error) {
      AboutAppAnalytics.trackLinkError(link, error.message);
    }
  };

  // Track scroll depth
  const handleScroll = (event: NativeScrollEvent) => {
    const { contentOffset, contentSize, layoutMeasurement } = event;
    const scrollDepth =
      (contentOffset.y + layoutMeasurement.height) / contentSize.height;

    // Only track if scroll depth has changed by more than 10%
    if (Math.abs(scrollDepth - lastScrollDepth.current) > 0.1) {
      lastScrollDepth.current = scrollDepth;
      AboutAppAnalytics.trackScrollDepth(scrollDepth);
    }
  };

  return (
    <PageView
      header={{
        title: "About App",
        icon: "arrow-left",
        onLeft: () => router.back(),
      }}
    >
      <ScrollView
        className="flex-1 p-4"
        onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
        scrollEventThrottle={16}
      >
        {/* Title */}
        <Text className="text-lg text-primary">
          React Native Loop is an experiment.
        </Text>

        <Text className="text-base text-zinc-700 dark:text-zinc-300 mt-2">
          I build this app because I wanted to understand how the Loop game
          calculates results and figure out a way to implement the game
          interface in the React Native ecosystem with animations and themes.
        </Text>

        {/* Links */}
        <View className="mt-6">
          {links.map((link) => (
            <TouchableOpacity
              key={link.icon}
              className="flex-row items-center justify-center gap-3 py-3 px-4 mt-4
                border border-zinc-300 dark:border-zinc-700 rounded-md
                bg-zinc-50 dark:bg-zinc-800"
              onPress={() => handleLinkClick(link)}
            >
              <FontAwesome6
                name={link.icon as any}
                className="text-black dark:text-white text-lg"
              />
              <Text className="text-lg font-medium text-zinc-800 dark:text-zinc-100">
                {link.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </PageView>
  );
}

export default AboutAppScreen;
