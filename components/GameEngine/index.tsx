import React from "react";
import { View, Animated } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useGameEngine } from "./useGameEngine";
import { BoxType, GridBox } from "../../types";
import { Shape } from "./Shape";

interface GameEngineProps {
  level: number;
  onSuccess?: () => void;
}

export function GameEngine({ level, onSuccess }: GameEngineProps) {
  const { grid, size, theme, success, setRotate, animateColor } =
    useGameEngine(level);

  return (
    <View className="flex-1 items-center justify-center">
      {grid.map((row, y) => (
        <View key={y} className="flex-row">
          {row.map((box, x) => (
            <TouchableOpacity
              key={box.id}
              onPress={() => setRotate(x, y)}
              disabled={box.type === "null"}
            >
              <Shape
                {...box}
                size={size}
                success={success}
                animateColor={animateColor}
                theme={theme}
              />
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}
