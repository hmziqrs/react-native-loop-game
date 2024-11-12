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
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
    <ScrollView className="flex-1 bg-zinc-50 dark:bg-zinc-900 p-4">
      {/* Title */}
      <TouchableOpacity testID="title" onLongPress={handleLongPress}>
        <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 text-center">
          About App
        </Text>
      </TouchableOpacity>

      {/* Description */}
      <Text className="text-lg text-primary mt-4">
        React Native Loop is just a fun experiment of mine.
      </Text>

      <Text className="text-base text-zinc-700 dark:text-zinc-300 mt-2">
        I crafted this app because I wanted to understand how the Loop game
        calculates results and figure out a way to implement the game interface
        in the React Native ecosystem as much as possible with all the good
        animations and themes. So I implemented a few levels with clean code,
        good architecture, and no Redux.
      </Text>

      {/* Notes */}
      <Text className="text-base font-semibold text-zinc-700 dark:text-zinc-300 mt-4">
        Original app and GitHub code's links are shared below, and any piece of
        code is free to use.
      </Text>

      <Text className="text-base font-semibold text-zinc-700 dark:text-zinc-300 mt-2">
        All music is downloaded from orangefreesounds.com. Link is shared below.
      </Text>
      <View className="mt-6">
        {links.map((link) => (
          <TouchableOpacity
            key={link.icon}
            className="flex-row items-center justify-center
            gap-3 py-3 px-4 mt-4 mx-4 border border-zinc-300
            dark:border-zinc-700 rounded-md bg-zinc-50 dark:bg-zinc-800 shadow"
            onPress={() => Linking.openURL(link.url)}
          >
            <MaterialCommunityIcons
              name={link.icon as any}
              size={24}
              className="text-black dark:text-white"
            />
            <Text className="text-lg font-medium text-zinc-800 dark:text-zinc-100">
              {link.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default AboutAppScreen;
