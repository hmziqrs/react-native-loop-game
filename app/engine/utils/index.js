import { Animated } from 'react-native';
import { value2RotaionMap } from '../constants';

export function data2Grid(data) {
  return data.map((column, y) =>
    column.map((box, x) => {
      const rotate = value2RotaionMap[box.type][box.values.join('')];
      const animation = new Animated.Value(rotate);
      return {
        ...box,
        rotate,
        animation,
        id: `${x}-${y}`,
      };
    }),
  );
}

export function safeIndex(index) {
  if (index > 3) {
    return 0;
  }
  return index;
}

export function rotateBox(box) {
  const newValues = [0, 0, 0, 0];

  box.values.forEach((value, index) => {
    if (value) {
      newValues[safeIndex(index + 1)] = 1;
    }
  });

  return {
    ...box,
    values: newValues,
    rotate: value2RotaionMap[box.type][newValues.join('')],
  };
}

/*
  Index Mapping
  top: 0
  right: 1
  bottom: 2
  left: 3
*/
export function calculateSuccess(grid) {
  const yEnd = grid.length - 1;
  const yStart = 0;

  // eslint-disable-next-line
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];

    // eslint-disable-next-line
    for (let x = 0; x < row.length; x++) {
      const box = row[x];
      const xEnd = row.length - 1;
      const xStart = 0;

      if (box.type === 'null') {
        continue; //eslint-disable-line
      }

      // eslint-disable-next-line
      for (let index = 0; index < box.values.length; index++) {
        const value = box.values[index];
        // console.log(`y: ${y}, x: ${x}, index: ${index}, type ${box.type}, values: ${box.values}`);

        // Check Top Element [Start]
        if (index === 0 && value === 1 && (y === yStart || grid[y - 1][x].values[2] === 0)) {
          return false;
        }

        // Check Right Element [Start]
        if (index === 1 && value === 1 && (x === xEnd || grid[y][x + 1].values[3] === 0)) {
          return false;
        }

        // Check Bottom Element [Start]
        if (index === 2 && value === 1 && (y === yEnd || grid[y + 1][x].values[0] === 0)) {
          return false;
        }

        // Check Right Element [Start]
        if (index === 3 && value === 1 && (x === xStart || grid[y][x - 1].values[1] === 0)) {
          return false;
        }
      }
    }
  }

  return true;
}
