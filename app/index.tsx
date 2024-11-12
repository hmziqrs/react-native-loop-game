import React from "react";
import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { PageView } from "@/components/PageView";
import { useSettings } from "@/contexts/Settings";

const links = [
  { key: "levels", label: "Explore Levels" },
  { key: "about", label: "About App" },
  { key: "developer", label: "About Developer" },
  { key: "settings", label: "Settings" },
];

export default function HomeScreen() {
  const { player } = useSettings();

  React.useEffect(() => {
    if (player) {
      player.pauseAsync();
    }
  }, [player]);

  return (
    <PageView>
      <View className="p-4">
        <Text className="text-3xl font-bold mb-2">Welcome</Text>
        <Text className="text-gray-600 dark:text-gray-300 mb-6">
          Explore loop game's clone built with React Native
        </Text>

        <View className="space-y-4">
          {links.map((link) => (
            <Link key={link.key} href={`/${link.key}`} asChild>
              <Pressable className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <Text className="text-center text-lg font-semibold text-primary">
                  {link.label}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>
    </PageView>
  );
}
