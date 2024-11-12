// import { useState, useEffect } from "react";
// import { Animated } from "react-native";
// import { data2Grid, rotateBox, calculateSuccess } from "../engine/utils";
// import { levels } from "@/engine/levels";
// import { GridBox } from "../types";

// export function useGameEngine(levelNumber: number) {
//   const level = levels[levelNumber];
//   const [grid, setGrid] = useState(() => data2Grid(level.data));
//   const [success, setSuccess] = useState(false);
//   const [colorAnimation] = useState(new Animated.Value(0));

//   const setRotate = (x: number, y: number) => {
//     const newGrid = [...grid];
//     const newBox = rotateBox(grid[y][x]);
//     newGrid[y][x] = newBox;

//     Animated.timing(newBox.animation, {
//       toValue: newBox.rotate,
//       duration: 140,
//       useNativeDriver: true,
//     }).start();

//     setGrid(newGrid);
//     setTimeout(() => {
//       setSuccess(calculateSuccess(newGrid));
//     }, 70);
//   };

//   useEffect(() => {
//     Animated.timing(colorAnimation, {
//       toValue: success ? 1 : 0,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//   }, [success]);

//   return {
//     grid,
//     success,
//     theme: level.theme,
//     setRotate,
//     colorAnimation,
//   };
// }
