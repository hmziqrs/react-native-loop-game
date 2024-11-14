import React from "react";
import { View, ScrollView, ViewStyle } from "react-native";
import {
  NativeSafeAreaViewProps,
  SafeAreaView,
} from "react-native-safe-area-context";
import { Header } from "./Header";

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
  safe?: NativeSafeAreaViewProps;
}

export function PageView({
  children,
  type = "default",
  header,
  style,
  disableMaxContainer = false,
  safe = {},
}: PageViewProps) {
  return (
    <View className="flex-1 bg-white dark:bg-black">
      <View className="flex-1 bg-zinc-50 dark:bg-zinc-900/50">
        <SafeAreaView edges={["bottom"]} {...safe} className="flex-1">
          {header && <Header {...header} />}
          {children}
        </SafeAreaView>
      </View>
    </View>
  );
}
