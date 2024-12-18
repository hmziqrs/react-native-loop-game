import { Animated, Easing, Platform, ViewStyle } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { captureRef } from "react-native-view-shot";

import domtoimage from "dom-to-image";
import share from "react-native-share";

import { rotateBox, calculateSuccess, data2Grid } from "./utils";
import * as UI from "./ui";
import { GridBox, Level, Theme } from "./types";
import { levels } from "./levels";
import { useSettings } from "@/contexts/Settings";
import Toast from "react-native-toast-message";
import { captureNShare } from "./capture";

interface Player {
  play: () => void;
}

interface EngineControls {
  next: () => void;
  prev: () => void;
  reset: () => void;
}

interface EngineReturn {
  grid: GridBox[][];
  level: number;
  theme: Theme;
  success: boolean;
  capture: (ref: React.RefObject<any>) => Promise<void>;
  setRotate: (x: number, y: number) => void;
  animateColor: (color: string) => Animated.AnimatedInterpolation<string>;
  size: number;
  controls: EngineControls;
}

export default function useEngine(forceLevel: number): EngineReturn {
  const [level, setLevel] = useState<number>(forceLevel);
  const { data, theme } = levels[level];
  const [grid, setGrid] = useState<GridBox[][]>(data2Grid(data));
  const [success, setSuccess] = useState<boolean>(false);
  const [colorAnimation] = useState<Animated.Value>(new Animated.Value(0));
  const delay = 140;
  const [prevLevel, setPrevLevel] = useState<number>(level);

  function setRotate(x: number, y: number): void {
    const newGrid = [...grid];
    const newBox = rotateBox(grid[y][x]);
    newGrid[y][x] = newBox;
    let toValue = newBox.rotate;

    if (newBox.type === "line") {
      toValue = (newBox.animation as any)._value + 1;
    }
    if (toValue === 0) {
      toValue = 4;
    }
    if (newBox.type === "4-point") {
      toValue = 1;
    }

    Animated.timing(newBox.animation, {
      toValue,
      duration: delay,
      easing: Easing.linear,
      useNativeDriver: false, // Add this for color animations
    }).start(() => {
      if (toValue === 4 || newBox.type === "4-point") {
        newBox.animation = new Animated.Value(0);
      }
    });

    const check = calculateSuccess(newGrid);
    setTimeout(() => setSuccess(check), delay / 2);
    setGrid(newGrid);
  }

  async function capture(ref: React.RefObject<any>): Promise<void> {
    try {
      captureNShare(ref);
      // settings
    } catch (e) {
      console.error(e);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: (e as any)?.message ?? "Failed to share screenshot",
      });
      // player.play();
    }
  }

  function changeLevel(no: number, prev: number): void {
    setPrevLevel(prev);
    const newLevel = levels[no];
    if (newLevel) {
      setLevel(no);
      setGrid(data2Grid(newLevel.data));
    }
  }

  function animateColor(color: string): Animated.AnimatedInterpolation<string> {
    const from = (theme.light as any)[color as any].rgb().string();
    let to = (theme.dark as any)[color as any].rgb().string();

    if (prevLevel !== level) {
      to = (levels[prevLevel] as any).theme.dark[color as any].rgb().string();
    }

    return colorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [from, to],
      // duration: 800,
    });
  }

  useEffect(() => {
    const check = calculateSuccess(grid);
    const timeout = setTimeout(() => setSuccess(check), delay / 2);
    return () => clearTimeout(timeout);
  }, [grid]);

  useEffect(() => {
    Animated.timing(colorAnimation, {
      toValue: success ? 1 : 0,
      useNativeDriver: false, // Add this for color animations
    }).start((e) => {
      if (prevLevel !== level && e.finished) {
        setPrevLevel(level);
      }
    });
  }, [success, level, prevLevel]);

  return useMemo(
    () => ({
      grid,
      level,
      theme,
      success,
      capture,
      setRotate,
      animateColor,
      size: Math.floor(UI.getWidth() / 8),
      controls: {
        next: () => changeLevel(level + 1, level),
        prev: () => changeLevel(level - 1, level),
        reset: () => changeLevel(level, level),
      },
    }),
    [grid, level, theme, success, prevLevel],
  );
}
