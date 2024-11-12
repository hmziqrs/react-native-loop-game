import Color from "color";
import { Animated } from "react-native";

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

export interface AnimationControls {
  value: Animated.Value;
  animate: (config: AnimationConfig) => Promise<void>;
  spring: (config: SpringConfig) => Promise<void>;
}

export interface AnimationConfig {
  toValue: number;
  duration?: number;
  useNativeDriver?: boolean;
}

export interface SpringConfig {
  toValue: number;
  useNativeDriver?: boolean;
  friction?: number;
  tension?: number;
}
