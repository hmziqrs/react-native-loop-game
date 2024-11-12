import React from "react";
import { View, Text, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { PageView } from "@/components/PageView";
// import { levels } from "@/engine/levels";

export default function LevelsScreen() {
  return (
    <PageView
      header={{
        title: "Levels",
        icon: "arrow-back",
        onLeft: () => router.back(),
      }}
    >
      <View className="flex-row flex-wrap justify-center p-4">
        {Object.keys(levels).map((level) => (
          <Link key={level} href={`/game/${level}`} asChild>
            <Pressable
              className={cn(
                "w-[calc(50%-16px)] m-2 p-4 rounded-lg",
                "bg-white dark:bg-gray-800",
                "border border-primary/50",
              )}
            >
              <Text className="text-center text-lg font-semibold text-primary">
                Level {level}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </PageView>
  );
}
