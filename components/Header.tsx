import React from "react";
import { View, Text, ViewStyle, TextStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../contexts/Theme";
import { cn } from "../utils/styles";

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
  const { colors } = useTheme();

  return (
    <View
      className={cn(
        "z-10 px-3 flex-row items-center bg-white",
        "pt-[calc(theme(spacing.3)+env(safe-area-inset-top))]",
      )}
      style={[baseStyle]}
    >
      {icon && (
        <TouchableOpacity
          onPress={onLeft}
          className="w-7 h-7 items-center justify-center absolute ml-2 mt-2"
        >
          <MaterialIcons name={icon} size={24} color={colors.black} />
        </TouchableOpacity>
      )}

      {typeof title === "string" ? (
        <Text className={cn("text-lg", icon ? "ml-8" : "")}>{title}</Text>
      ) : (
        children
      )}

      <View className="flex-1" />

      {rightIcon && (
        <TouchableOpacity
          onPress={onRight}
          className="w-7 h-7 items-center justify-center"
        >
          <MaterialIcons name={rightIcon} size={24} color={colors.black} />
        </TouchableOpacity>
      )}
    </View>
  );
}
