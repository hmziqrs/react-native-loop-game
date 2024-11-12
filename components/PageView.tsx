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
  baseStyle?: ViewStyle;
  disableMaxContainer?: boolean;
}

export function PageView({
  children,
  type = "default",
  header,
  style,
  baseStyle,
  disableMaxContainer = false,
}: PageViewProps) {
  const Content = type === "scroll" ? ScrollView : View;

  return (
    <SafeAreaView
      className={cn(
        "flex-1 bg-white dark:bg-gray-900",
        "max-w-[650px] mx-auto",
      )}
      style={baseStyle}
    >
      {header && <Header {...header} />}

      <Content
        className={cn(
          "flex-1",
          !disableMaxContainer && "max-w-[650px] mx-auto",
        )}
        style={style}
      >
        {children}
      </Content>
    </SafeAreaView>
  );
}
