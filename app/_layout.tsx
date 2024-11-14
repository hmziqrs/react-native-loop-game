import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import "../global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SettingsProvider } from "@/contexts/Settings";
import { ThemeProvider } from "@/contexts/Theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { cssInterop } from "nativewind";
import { FontAwesome6 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

cssInterop(FontAwesome6, {
  className: {
    target: "style",
    nativeStyleToProp: { height: true, width: true, color: true },
  },
});

// cssInterop(StatusBar, {
//   b: {
//     target: false,
//     nativeStyleToProps: { backgroundColor: 'backgroundColor' },
//   },
// });


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
    <StatusBar translucent />
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationThemeProvider
        value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <SettingsProvider>
          <ThemeProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </SettingsProvider>
      </NavigationThemeProvider>
    </GestureHandlerRootView>
    </>
  );
}
