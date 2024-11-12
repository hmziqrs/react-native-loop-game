import React from "react";
import { View } from "react-native";
import { GridBox, Theme } from "../../types";
import { Shape } from "./Shape";

interface GridProps {
  grid: GridBox[][];
  size: number;
  theme: Theme;
  success: boolean;
  onRotate: (x: number, y: number) => void;
}

export function Grid({ grid, size, theme, success, onRotate }: GridProps) {
  return (
    <View className="flex-1 items-center justify-center">
      {grid.map((row, y) => (
        <View key={y} className="flex-row">
          {row.map((box, x) => (
            <Pressable
              key={box.id}
              onPress={() => onRotate(x, y)}
              disabled={box.type === "null"}
            >
              <Shape
                type={box.type}
                size={size}
                rotate={box.rotate}
                animation={box.animation}
                success={success}
                theme={theme}
              />
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}
