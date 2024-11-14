import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StatusBar,
  Animated,
  type ViewStyle,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { useSettings } from "@/contexts/Settings";
import useEngine from "@/engine";
import LevelSelectOverlay from "./SelectOverlay";
import Shapes from "./Shapes";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedFontAwesome6 = Animated.createAnimatedComponent(FontAwesome6);

export default function LevelScreen() {
  const params = useGlobalSearchParams<{ id: string }>();
  const forceLevel = parseInt(params.id, 10) || 1;
  const [toggle, setToggle] = useState(false);
  const { playAudio, pauseAudio } = useSettings();
  const safeTop = useSafeAreaInsets().top;
  // const { theme } = useTheme();
  const {
    theme,
    level,
    size,
    grid,
    capture,
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
    <Animated.View ref={ref} collapsable={false} style={bgStyle}>
      <SafeAreaView className="flex-1">
        <View className="flex-1">
          <View className="flex-1 items-center justify-center">
            <Animated.Text
              style={{
                color: animateColor('accent'),
                fontWeight: '600',
                position: 'absolute',
                top: 20 + safeTop,
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
                        ['null'].indexOf(type) === -1 &&
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
            className={`absolute inset-0 ${
              success ? 'visible w-full h-full' : 'invisible'
            }`}
          >
            <TouchableOpacity style={{ flex: 1 }} onPress={controls.next}>
              <View className="flex-1" />
            </TouchableOpacity>
          </View>

          <Animated.Text
            style={{
              color: animateColor('accent'),
              textAlign: 'center',
              fontWeight: '600',
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

        <TouchableOpacity
          className="self-center p-4"
          onPress={() => (success ? capture(ref) : setToggle(!toggle))}
        >
          <AnimatedFontAwesome6
            name={success ? 'camera' : 'bars'}
            size={32}
            style={{
              color: success
                ? (animateColor('accent') as any)
                : theme.light.accent.alpha(0.99).toString(),
            }}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </Animated.View>
  );
}
