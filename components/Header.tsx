import React from "react";
import { View, Text, ViewStyle, TextStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome6 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderProps {
  title?: string | { id: string; values?: Record<string, string> };
  icon?: string;
  rightIcon?: string;
  onLeft?: () => void;
  onRight?: () => void;
  baseStyle?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
}

export function Header({
  children,
  title,
  baseStyle,
  icon,
  rightIcon,
  onRight = () => {},
  onLeft = () => {},
}: HeaderProps) {
  // const theme = useTheme();

  return (
    <SafeAreaView
      className="bg-zinc-100/90 dark:bg-zinc-800/50"
      edges={["top"]}
      style={[baseStyle]}
    >
      <View className="z-10 px-4 py-4 gap-4 flex-row items-center">
        {icon && (
          <TouchableOpacity
            onPress={onLeft}
            className="w-7 h-7 items-center justify-center absolute"
          >
            <FontAwesome6
              name={icon as any}
              className="dark:text-white text-black text-lg"
            />
          </TouchableOpacity>
        )}

        {typeof title === "string" ? (
          <Text className="text-black dark:text-white text-xl">{title}</Text>
        ) : (
          children
        )}

        <View className="flex-1" />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRight}
            className="w-7 h-7 items-center justify-center"
          >
            <FontAwesome6 name={rightIcon as any} size={24} color={"#000"} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
