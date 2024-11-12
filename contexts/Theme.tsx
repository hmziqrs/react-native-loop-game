import React, { createContext, useContext, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Color from "color";
import { Theme } from "../types";

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  setTheme: (theme: ThemeMode) => Promise<void>;
  setDefaultStatusBar: () => void;
}

export type ThemeMode = "default" | "light" | "dark";

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

const THEME_KEY = "app_theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("default");
  const { colorScheme } = useColorScheme();
  const systemDark = colorScheme === "dark";
  const isDark = theme === "dark" || (theme === "default" && systemDark);

  const setDefaultStatusBar = () => {
    // StatusBar from expo-status-bar handles this automatically
  };

  const setTheme = async (newTheme: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
      setThemeState(newTheme);
    } catch (e) {
      console.error("Failed to save theme", e);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then((savedTheme) => {
      if (savedTheme) {
        setThemeState(savedTheme as ThemeMode);
      }
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, isDark, setTheme, setDefaultStatusBar }}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
