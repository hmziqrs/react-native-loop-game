import React from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGameEngine } from "@/hooks/useGameEngine";
import { PageView } from "@/components/PageView";
import { Grid } from "@/components/game/Grid";
import { Controls } from "@/components/game/Controls";
import { LevelManager } from "@/components/game/LevelManager";

export default function GameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const levelNumber = parseInt(id, 10);
  const viewRef = React.useRef<View>(null);

  const { grid, size, theme, success, setRotate, resetLevel } =
    useGameEngine(levelNumber);

  return (
    <PageView
      disableMaxContainer
      baseStyle={{ backgroundColor: theme.light.primary.string() }}
    >
      <LevelManager level={levelNumber} success={success}>
        <View ref={viewRef} className="flex-1">
          <Text
            className={cn(
              "text-2xl font-bold text-center mt-4",
              "text-accent dark:text-accent-light",
            )}
          >
            #{levelNumber}
          </Text>

          <Grid
            grid={grid}
            size={size}
            onRotate={setRotate}
            success={success}
            theme={theme}
          />

          <Text
            className={cn(
              "text-lg font-semibold text-center mb-4",
              "text-accent/70 dark:text-accent-light/70",
            )}
          >
            React Native Loop
          </Text>
        </View>

        <Controls
          success={success}
          onCapture={() => {}}
          onReset={resetLevel}
          onNext={() => {}}
          level={levelNumber}
          viewRef={viewRef}
        />
      </LevelManager>
    </PageView>
  );
}
