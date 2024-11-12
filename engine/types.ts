import Color from "color";
import { Animated } from "react-native";

export interface Level {
  theme: Theme;
  data: BoxData[][];
}

export interface BoxData {
  type: BoxType;
  values: number[];
}

export type BoxType =
  | "null"
  | "line"
  | "1-point"
  | "2-point"
  | "3-point"
  | "4-point";

export interface GameState {
  init: boolean;
  level: number;
  grid: GridBox[][];
  success: boolean;
}

export interface GridBox extends BoxData {
  id: string;
  rotate: number;
  animation: Animated.Value;
}

export interface Theme {
  light: {
    primary: Color;
    accent: Color;
  };
  dark: {
    primary: Color;
    accent: Color;
  };
}
