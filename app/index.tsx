import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Link } from "expo-router";
import { PageView } from "@/components/PageView";
import { useSettings } from "@/contexts/Settings";

const links = [
  { key: "levels", label: "Explore Levels" },
  { key: "about-app", label: "About App" },
  { key: "developer", label: "About Developer" },
  { key: "settings", label: "Settings" },
  { key: "privacy", label: "Privacy" },
];

export default function HomeScreen() {
  return (
    <PageView header={{ title: "Home" }}>
      <View className="p-4">
        <Text className="dark:text-white text-3xl font-bold mb-2">Welcome</Text>
        <Text className="text-zinc-600 dark:text-zinc-300 mb-6">
          Explore loop game's clone built with React Native
        </Text>

        <View className="gap-4">
          {links.map((link) => (
            <Link key={link.key} href={`/${link.key}`} asChild>
              <TouchableOpacity className="bg-white dark:bg-zinc-900/20 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <Text className="text-center text-lg font-semibold text-primary">
                  {link.label}
                </Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </View>
    </PageView>
  );
}
