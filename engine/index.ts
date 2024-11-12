import { Animated, Easing, ViewStyle } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { captureRef } from "react-native-view-shot";
import performance from "@react-native-firebase/perf";
import share from "react-native-share";

import { rotateBox, calculateSuccess, data2Grid } from "./utils";
import * as UI from "./ui";
import { Level, Theme } from "./types";
import { levels } from "./levels";

// Types
interface Box {
  type: string;
  rotate: number;
  animation: Animated.Value;
}

interface Player {
  play: () => void;
}

interface EngineControls {
  next: () => void;
  prev: () => void;
  reset: () => void;
}

interface EngineReturn {
  grid: Box[][];
  level: number;
  theme: Theme;
  success: boolean;
  capture: (ref: React.RefObject<any>) => Promise<void>;
  setRotate: (x: number, y: number) => void;
  animateColor: (color: string) => Animated.AnimatedInterpolation<string>;
  size: number;
  controls: EngineControls;
}

export default function useEngine(
  forceLevel: number,
  player: Player,
): EngineReturn {
  const [level, setLevel] = useState<number>(forceLevel);
  const { data, theme } = levels[level];
  const [grid, setGrid] = useState<Box[][]>(data2Grid(data));
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
      toValue = (newBox.animation as Animated.Value)._value + 1;
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
      const trace = await performance().startTrace("capture_screenshot");

      const base64 = await captureRef(ref.current, {
        format: "jpg",
        quality: 1.0,
        result: "base64",
      });

      await trace.stop();
      await share.open({
        url: `data:image/jpeg;base64,${base64}`,
        filename: `rn-loop-game-${new Date().getTime()}`,
      });
      player.play();
    } catch (e) {
      player.play();
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
    const from = theme.light[color].rgb().string();
    let to = theme.dark[color].rgb().string();

    if (prevLevel !== level) {
      to = levels[prevLevel].theme.dark[color].rgb().string();
    }

    return colorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [from, to],
      duration: 800,
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
