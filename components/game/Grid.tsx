import React from "react";
import { View } from "react-native";
import { GridBox } from "../../types";
import { Shape } from "./Shape";

interface GridProps {
  grid: GridBox[][];
  size: number;
  onRotate: (x: number, y: number) => void;
  success: boolean;
  theme: any; // Replace with proper theme type
}

export function Grid({ grid, size, onRotate, success, theme }: GridProps) {
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
              <Shape {...box} size={size} success={success} theme={theme} />
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}
