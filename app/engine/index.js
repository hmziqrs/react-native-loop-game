import { Animated, Easing } from 'react-native';
import { useState, useEffect, useMemo } from 'react';
import { captureRef } from 'react-native-view-shot';
import share from 'react-native-share';

// import { initLayout } from 'utils/ui';

import { rotateBox, calculateSuccess, data2Grid } from './utils';
import * as UI from './utils/ui';

import levels from './levels';

export default function useEngine(forceLevel) {
  const [level, setLevel] = useState(forceLevel);
  const { data, theme } = levels[level];
  const [grid, setGrid] = useState(data2Grid(data));
  const [success, setSuccess] = useState(false);
  const [colorAnimation] = useState(new Animated.Value(0));
  const delay = 140;
  const [prevLevel, setPrevLevel] = useState(level);

  function setRotate(x, y) {
    const newGrid = [...grid];
    const newBox = rotateBox(grid[y][x]);
    newGrid[y][x] = newBox;
    let toValue = newBox.rotate;

    if (newBox.type === 'line') {
      toValue = newBox.animation._value + 1;
    }
    if (toValue === 0) {
      toValue = 4;
    }
    if (newBox.type === '4-point') {
      toValue = 1;
    }
    Animated.timing(newBox.animation, {
      toValue,
      duration: delay,
      easing: Easing.linear,
    }).start(() => {
      if (toValue === 4 || newBox.type === '4-point') {
        newBox.animation = new Animated.Value(0);
      }
    });

    const check = calculateSuccess(newGrid);
    setTimeout(() => setSuccess(check), delay / 2);
    setGrid(newGrid);
  }

  async function capture(ref) {
    try {
      const base64 = await captureRef(ref, {
        format: 'jpg',
        quality: 1.0,
        result: 'base64',
      });
      await share.open({
        url: `data:image/jpg;base64,${base64}`,
        filename: `rn-loop-game-${new Date().getTime()}`,
      });
    } catch (e) {
      // e
    }
  }

  function changeLevel(no, prev) {
    setPrevLevel(prev);
    const newLevel = levels[no];
    if (newLevel) {
      // initLayout();
      setLevel(no);
      setGrid(data2Grid(newLevel.data));
    }
  }

  function animateColor(color) {
    const from = theme.light[color].rgb().string();
    let to = theme.dark[color].rgb().string();

    if (prevLevel !== level) {
      to = levels[prevLevel].theme.dark[color].rgb().string();
    }

    return colorAnimation.interpolate({
      duration: 800,
      inputRange: [0, 1],
      outputRange: [from, to],
    });
  }

  useEffect(() => {
    const check = calculateSuccess(grid);
    setTimeout(() => setSuccess(check), delay / 2);
  });

  useEffect(() => {
    Animated.timing(colorAnimation, {
      toValue: success ? 1 : 0,
    }).start((e) => {
      if (prevLevel !== level && e.finished) {
        setPrevLevel(level);
      }
    });
  }, [success]);

  return useMemo(() => ({
    grid,
    level,
    theme,
    // theme: levels[level].theme.dark,
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
  }));
}
