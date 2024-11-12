import React from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGameEngine } from "@/hooks/useGameEngine";
import { Grid } from "@/components/game/Grid";
import { Controls } from "@/components/game/Controls";
import { LevelInfo } from "@/components/game/LevelInfo";
import { SuccessAnimation } from "@/components/game/SuccessAnimation";
import { LevelSelectOverlay } from "@/components/game/LevelSelectOverlay";

export default function GameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const level = parseInt(id, 10);
  const viewRef = React.useRef<View>(null);
  const [showOverlay, setShowOverlay] = React.useState(false);

  const { grid, size, theme, success, setRotate, reset, nextLevel, prevLevel } =
    useGameEngine(level);

  return (
    <View
      ref={viewRef}
      className="flex-1"
      style={{ backgroundColor: theme.light.primary.toString() }}
    >
      <LevelInfo level={level} theme={theme} success={success} />

      <Grid
        grid={grid}
        size={size}
        theme={theme}
        success={success}
        onRotate={setRotate}
      />

      <SuccessAnimation show={success} theme={theme} />

      <Controls
        success={success}
        onCapture={() => {}}
        onReset={reset}
        onNext={nextLevel}
        level={level}
        viewRef={viewRef}
      />

      <LevelSelectOverlay
        level={level}
        theme={theme}
        onNext={nextLevel}
        onPrev={prevLevel}
        isVisible={showOverlay}
        onClose={() => setShowOverlay(false)}
      />
    </View>
  );
}
