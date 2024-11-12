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
