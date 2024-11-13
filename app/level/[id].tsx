import React, { useRef, useEffect, useState } from "react";
import { View, StatusBar, Animated, type ViewStyle } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useSettings } from "@/contexts/Settings";
import useEngine from "@/engine";
import LevelSelectOverlay from "./SelectOverlay";
import Shapes from "./Shapes";
import { Pressable } from "react-native-gesture-handler";
import { PageView } from "@/components/PageView";

const AnimatedMaterialIcons = Animated.createAnimatedComponent(MaterialIcons);

export default function LevelScreen() {
  const params = useGlobalSearchParams<{ id: string }>();
  const forceLevel = parseInt(params.id, 10) || 1;
  const [toggle, setToggle] = useState(false);
  const { playAudio, pauseAudio } = useSettings();
  // const { theme } = useTheme();
  const {
    theme,
    level,
    size,
    grid,
    // capture not used, removing from destructure
    success,
    controls,
    setRotate,
    animateColor,
  } = useEngine(forceLevel);

  const ref = useRef<View>(null);

  // Handle sound state
  useEffect(() => {
    playAudio();
    return () => {
      pauseAudio();
      // setDefaultStatusBar();
    };
  }, []);

  // Handle status bar
  useEffect(() => {
    StatusBar.setBarStyle(success ? "light-content" : "dark-content", true);
  }, [success]);

  const bgStyle: ViewStyle = {
    flex: 1,
    backgroundColor: animateColor("primary") as any,
  };

  return (
    <PageView>
      <Animated.View ref={ref} style={bgStyle}>
        <View className="flex-1">
          <StatusBar animated />
          <View className="flex-1 items-center justify-center">
            <Animated.Text
              style={{
                color: animateColor("accent"),
                fontWeight: "600",
                position: "absolute",
                top: 20,
              }}
            >
              #{level}
            </Animated.Text>

            {grid.map((column, y) => (
              <View key={y} className="flex-row">
                {column.map(({ id, type, animation }, x) => (
                  <Shapes
                    key={id}
                    id={id}
                    size={size}
                    type={type}
                    success={success}
                    animation={animation}
                    animateColor={animateColor}
                    setRotate={() => {
                      if (
                        ["null"].indexOf(type) === -1 &&
                        Number.isInteger((animation as any)._value)
                      ) {
                        setRotate(x, y);
                      }
                    }}
                  />
                ))}
              </View>
            ))}
          </View>

          <View
            className={`absolute inset-0   ${success ? "visible" : "invisible"}`}
          >
            <View />
          </View>

          <Animated.Text
            style={{
              color: animateColor("accent"),
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            React Native Loop
          </Animated.Text>
        </View>

        <LevelSelectOverlay
          theme={theme}
          level={level}
          toggle={toggle}
          setToggle={setToggle}
          {...controls}
        />
      </Animated.View>

      <Animated.View style={{ backgroundColor: animateColor("primary") }}>
        <Pressable
          className="self-center p-3"
          // onPress={() => (success ? capture(ref) : setToggle(true))}
        >
          <AnimatedMaterialIcons
            name={success ? "camera" : "menu"}
            size={32}
            style={{
              color: success
                ? (animateColor("accent") as any)
                : theme.light.accent.alpha(0.99).toString(),
            }}
          />
        </Pressable>
      </Animated.View>
    </PageView>
  );
}
