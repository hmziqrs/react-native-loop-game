import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
  GestureResponderEvent,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { links } from "./data";
import { FontAwesome6 } from "@expo/vector-icons";
import { PageView } from "@/components/PageView";
import { router } from "expo-router";

type RootStackParamList = {
  AboutApp: undefined;
  // Add other screens here if needed
};

type AboutAppScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "AboutApp"
>;

function AboutAppScreen() {
  const handleLongPress = (event: GestureResponderEvent) => {
    // navigation.goBack();
  };

  return (
    <PageView
      header={{
        title: "About App",
        icon: "arrow-left",
        onLeft: () => router.back(),
      }}
    >
      <ScrollView className="flex-1 p-4">
        {/* Title */}
        {/* Description */}
        <Text className="text-lg text-primary">
          React Native Loop is an experiment.
        </Text>

        <Text className="text-base text-zinc-700 dark:text-zinc-300 mt-2">
          I build this app because I wanted to understand how the Loop game
          calculates results and figure out a way to implement the game
          interface in the React Native ecosystem with animations and themes. So
          I implemented a few levels with clean code, good architecture, and no
          Redux.
        </Text>

        {/* Notes */}
        <Text className="text-base text-zinc-700 dark:text-zinc-300 mt-4">
          Original app and GitHub code's links are shared below.
        </Text>

        <Text className="text-base text-zinc-700 dark:text-zinc-300 mt-2">
          All music is downloaded from orangefreesounds.com. Link is shared
          below.
        </Text>
        <View className="mt-6">
          {links.map((link) => (
            <TouchableOpacity
              key={link.icon}
              className="flex-row items-center justify-center
            gap-3 py-3 px-4 mt-4 border border-zinc-300
            dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-800 shadow"
              onPress={() => Linking.openURL(link.url)}
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
