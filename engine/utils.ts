import { Animated } from "react-native";
import { BoxData, GridBox } from "./types";
import { value2RotationMap } from "./constants";

export function data2Grid(data: BoxData[][]): GridBox[][] {
  return data.map((column, y) =>
    column.map((box, x) => {
      const rotate = value2RotationMap[box.type][box.values.join("")] || 1;
      return {
        ...box,
        rotate,
        animation: new Animated.Value(rotate),
        id: `${y}-${x}`,
      };
    }),
  );
}

export function rotateBox(box: GridBox): GridBox {
  const newValues = box.values.map((_, index) => {
    const prevIndex = index === 0 ? 3 : index - 1;
    return box.values[prevIndex];
  });

  return {
    ...box,
    values: newValues,
    rotate: value2RotationMap[box.type][newValues.join("")],
  };
}

export function calculateSuccess(grid: GridBox[][]): boolean {
  const yEnd = grid.length - 1;
  const yStart = 0;

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    const xEnd = row.length - 1;
    const xStart = 0;

    for (let x = 0; x < row.length; x++) {
      const box = row[x];

      if (box.type === "null") continue;

      for (let index = 0; index < box.values.length; index++) {
        const value = box.values[index];

        // Check connections in all directions
        if (
          index === 0 &&
          value === 1 &&
          (y === yStart || grid[y - 1][x].values[2] === 0)
        ) {
          return false;
        }
        if (
          index === 1 &&
          value === 1 &&
          (x === xEnd || grid[y][x + 1].values[3] === 0)
        ) {
          return false;
        }
        if (
          index === 2 &&
          value === 1 &&
          (y === yEnd || grid[y + 1][x].values[0] === 0)
        ) {
          return false;
        }
        if (
          index === 3 &&
          value === 1 &&
          (x === xStart || grid[y][x - 1].values[1] === 0)
        ) {
          return false;
        }
      }
    }
  }

  return true;
}
