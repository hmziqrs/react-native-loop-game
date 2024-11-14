import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { PageView } from "@/components/PageView";
import { router } from "expo-router";
import { links } from "./data";
import { AboutAppAnalytics } from "./analytics";
import { useScreenTracking } from "@/hooks/useScreenTracking";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useLinkTracking } from "@/hooks/useLinkTracking";

function AboutAppScreen() {
  // Use existing hooks with the AboutAppAnalytics implementation
  useScreenTracking({
    trackScreenView: AboutAppAnalytics.trackScreenView,
    trackScreenExit: AboutAppAnalytics.trackScreenExit,
  });

  const { handleScroll } = useScrollTracking({
    trackScrollDepth: AboutAppAnalytics.trackScrollDepth,
  });

  const { handleLinkClick } = useLinkTracking({
    trackLinkClick: AboutAppAnalytics.trackLinkClick,
    trackLinkError: AboutAppAnalytics.trackLinkError,
  });

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
