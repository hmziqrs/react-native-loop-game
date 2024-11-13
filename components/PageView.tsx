import React from "react";
import { View, ScrollView, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./Header";
import cn from "classnames";

interface PageViewProps {
  children: React.ReactNode;
  type?: "default" | "scroll";
  header?: {
    title?: string;
    icon?: string;
    onLeft?: () => void;
    rightIcon?: string;
    onRight?: () => void;
  };
  style?: ViewStyle;
  disableMaxContainer?: boolean;
}

export function PageView({
  children,
  type = "default",
  header,
  style,
  disableMaxContainer = false,
}: PageViewProps) {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      {header && <Header {...header} />}
      <View className="flex-1 bg-zinc-900.50 dark:bg-zinc-900/50">
        {children}
      </View>
    </SafeAreaView>
  );
}
