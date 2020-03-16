import { useState, useEffect, useMemo } from 'react';
import { Animated, Easing } from 'react-native';

export default function useHook(toggle) {
  const [mount, setMount] = useState(toggle);
  const [header, setHeader] = useState(false);
  const [opacity] = useState(new Animated.Value(0.0));

  useEffect(() => {
    if (toggle) {
      setMount(true);
    }
    Animated.timing(opacity, {
      toValue: toggle ? 1.0 : 0.0,
      duration: 400,
      ease: Easing.ease,
    }).start((e) => {
      if (e.finished && !toggle) {
        setMount(false);
      }
    });
  });
  return useMemo(() => ({
    mount,
    header,
    opacity,
    setHeader,
  }));
}
