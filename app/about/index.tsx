import React from "react";
import { View, Linking } from "react-native";
import { router } from "expo-router";
import { PageView } from "@/components/PageView";

const links = [
  {
    label: "Github",
    icon: "github",
    url: "https://github.com/hackerhgl/react-native-loop-clone",
  },
  {
    icon: "google-play",
    label: "Original App",
    url: "https://play.google.com/store/apps/details?id=com.balysv.loop",
  },
  {
    icon: "app-store",
    label: "Original App",
    url: "https://apps.apple.com/us/app/infinity-loop-endless-zen/id977028266",
  },
  {
    icon: "globe",
    label: "Orange Free Sounds",
    url: "http://www.orangefreesounds.com/",
  },
];

export default function AboutScreen() {
  return (
    <PageView
      header={{
        title: "About App",
        icon: "arrow-back",
        onLeft: () => router.back(),
      }}
    >
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          About App
        </Text>

        <Text className="text-gray-600 dark:text-gray-300 mb-4">
          React Native Loop is just a fun experiment of mine.
        </Text>

        <Text className="text-gray-600 dark:text-gray-300 mb-6">
          I crafted this app because I wanted to understand how the loop game
          calculates results & implement the game interface in React Native
          ecosystem with animations & themes.
        </Text>

        <View className="space-y-4">
          {links.map((link) => (
            <Pressable
              key={link.url}
              onPress={() => Linking.openURL(link.url)}
              className={cn(
                "flex-row items-center p-4 rounded-lg",
                "bg-white dark:bg-gray-800",
                "border border-primary/30",
              )}
            >
              <Icon name={link.icon} size={24} className="text-primary mr-3" />
              <Text className="text-gray-900 dark:text-white font-medium">
                {link.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </PageView>
  );
}
