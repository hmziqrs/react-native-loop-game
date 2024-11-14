import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { PageView } from "@/components/PageView";
import { levels } from "@/engine/levels";

export default function LevelsScreen() {
  return (
    <PageView
      header={{
        title: "Levels",
        icon: "arrow-left",
        onLeft: () => router.back(),
      }}
    >
      <View className="flex-row flex-wrap justify-center p-4 gap-4">
        {Object.keys(levels).map((level) => (
          <Link key={level} href={`/level/${level}`} asChild>
            <TouchableOpacity className="px-12 py-3 rounded-lg border border-primary/50">
              <Text className="text-center text-lg font-semibold text-primary">
                Level {level}
              </Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </PageView>
  );
}
