import React, { useRef, useContext, useEffect } from "react";
import { View, StatusBar, Animated } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

import { SettingsContext } from "@/contexts/Settings";
import { ThemeContext } from "@/contexts/Theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import useEngine from "@/engine";
import LevelSelectOverlay from "./SelectOverlay";
import useToggle from "./toggle.hook";
import { Shape } from "./Shapes";

interface AnimatedStyle {
  flex: number;
  backgroundColor: Animated.AnimatedInterpolation<string>;
}

export default function LevelScreen() {
  const { level: levelParam } = useLocalSearchParams<{ level: string }>();
  const forceLevel = parseInt(levelParam, 10) || 1;
  const { toggle, setToggle } = useToggle();
  const state = useContext(SettingsContext);
  // const { setDefaultStatusBar } = useContext(ThemeContext);

  const {
    level,
    size,
    grid,
    theme,
    capture,
    success,
    controls,
    setRotate,
    animateColor,
  } = useEngine(forceLevel);

  const ref = useRef<View>(null);

  state?.playSound();

  useEffect(() => {
    return () => {
      state?.pauseSound();
      // setDefaultStatusBar();
    };
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle(success ? "light-content" : "dark-content", true);
  }, [success]);

  const bgStyle: AnimatedStyle = {
    flex: 1,
    backgroundColor: animateColor("primary"),
  };

  return (
    <>
      <Animated.View ref={ref} style={bgStyle}>
        <View className="flex-1">
          {/* Main content */}
          <View className="items-center justify-center flex-1">
            <Animated.Text
              className="text-2xl font-bold mb-4"
              style={{ color: animateColor("accent") }}
            >
              #{level}
            </Animated.Text>

            {/* Grid */}
            <View className="flex-row flex-wrap justify-center">
              {grid.map((column, y) => (
                <View key={y} className="flex-row">
                  {column.map(({ id, type, animation }, x) => (
                    <Shape
                      key={id}
                      id={id}
                      size={size}
                      type={type}
                      success={success}
                      animation={animation}
                      // animateColor={animateColor}
                      // theme={success ? theme.dark : theme.light}
                      setRotate={() => {
                        if (
                          ["null"].indexOf(type) === -1 &&
                          // Number.isInteger(animation.value)
                        ) {
                          setRotate(x, y);
                        }
                      }}
                    />
                  ))}
                </View>
              ))}
            </View>

            {/* Next level button */}
            <TouchableOpacity
              onPress={controls.next}
              className={`absolute inset-0 ${success ? "opacity-100" : "opacity-0"}`}
            >
              <View />
            </TouchableOpacity>

            {/* Watermark */}
            <View className="absolute bottom-4">
              <Animated.Text
                className="text-sm opacity-50"
                style={{ color: animateColor("accent") }}
              >
                React Native Loop
              </Animated.Text>
            </View>
          </View>

          <LevelSelectOverlay
            theme={theme}
            level={level}
            toggle={toggle}
            setToggle={setToggle}
            {...controls}
          />
        </View>
      </Animated.View>

      {/* Capture button */}
      <Animated.View
        className="absolute bottom-4 right-4 rounded-full p-4"
        style={{ backgroundColor: animateColor("primary") }}
      >
        <TouchableOpacity
          onPress={() => (success ? capture(ref) : setToggle(true))}
          className="w-12 h-12 items-center justify-center"
        >
          <Icon
            name={success ? "camera" : "menu"}
            size={24}
            style={{
              color: success
                ? animateColor("accent")
                : theme.light.accent.alpha(0.4),
            }}
          />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}
