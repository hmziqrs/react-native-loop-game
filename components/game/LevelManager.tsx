import React from "react";
import { View, Animated } from "react-native";
import { router } from "expo-router";
import { levels } from "../../engine/levels";
import { useAnimation } from "../../hooks/useAnimation";
import { LevelOverlay } from "./LevelOverlay";

interface LevelManagerProps {
  level: number;
  success: boolean;
  children: React.ReactNode;
}

export function LevelManager({ level, success, children }: LevelManagerProps) {
  const { value: fadeAnim, animate } = useAnimation(1);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const handleNextLevel = async () => {
    if (isTransitioning) return;

    const nextLevel = level + 1;
    if (!levels[nextLevel]) {
      router.replace("/levels");
      return;
    }

    setIsTransitioning(true);
    await animate({ toValue: 0, duration: 400, useNativeDriver: true });
    router.replace(`/game/${nextLevel}`);
  };

  React.useEffect(() => {
    if (isTransitioning) {
      animate({ toValue: 1, duration: 400, useNativeDriver: true });
      setIsTransitioning(false);
    }
  }, [level]);

  return (
    <View className="flex-1">
      <Animated.View className="flex-1" style={{ opacity: fadeAnim }}>
        {children}
      </Animated.View>

      <LevelOverlay
        level={level}
        success={success}
        isVisible={success}
        onNext={handleNextLevel}
      />
    </View>
  );
}
