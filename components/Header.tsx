import React from "react";
import { View, Text, ViewStyle, TextStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/Theme";
import cn from "classnames";

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
    <View
      className="z-10 px-4 py-3 flex-row items-center
      bg-zinc-100 dark:bg-zinc-800/50
      pt-[calc(theme(spacing.3)+env(safe-area-inset-top))]"
      style={[baseStyle]}
    >
      {icon && (
        <TouchableOpacity
          onPress={onLeft}
          className="w-7 h-7 items-center justify-center absolute"
        >
          <MaterialIcons
            name={icon as any}
            size={18}
            className="dark:text-white"
          />
        </TouchableOpacity>
      )}

      {icon && <View className="w-2" />}

      {typeof title === "string" ? (
        <Text className="text-base text-white">{title}</Text>
      ) : (
        children
      )}

      <View className="flex-1" />

      {rightIcon && (
        <TouchableOpacity
          onPress={onRight}
          className="w-7 h-7 items-center justify-center"
        >
          <MaterialIcons name={rightIcon as any} size={24} color={"#000"} />
        </TouchableOpacity>
      )}
    </View>
  );
}
