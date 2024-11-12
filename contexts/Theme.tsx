import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";

const THEME_STORAGE_KEY = "theme";

export const THEMES = {
  default: "default",
  light: "light",
  dark: "dark",
} as const;

type ThemeType = (typeof THEMES)[keyof typeof THEMES];

interface ThemeContextType {
  theme: ThemeType;
  isDark: boolean;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>(THEMES.default);
  const { colorScheme, setColorScheme } = useColorScheme();

  // Determine if dark mode is active
  const isDark =
    theme === THEMES.dark ||
    (theme === THEMES.default && colorScheme === "dark");

  // Update status bar and NativeWind theme
  const updateThemeEffects = () => {
    StatusBar.setBarStyle(isDark ? "light-content" : "dark-content", true);
    setColorScheme(isDark ? "dark" : "light");
  };

  // Set theme and save to storage
  const setTheme = async (newTheme: ThemeType) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error("Failed to set theme:", error);
    }
  };

  // Load saved theme on mount
  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = (await AsyncStorage.getItem(
          THEME_STORAGE_KEY,
        )) as ThemeType;
        if (savedTheme) setThemeState(savedTheme);
      } catch (error) {
        console.error("Failed to load saved theme:", error);
      }
    };

    loadSavedTheme();
  }, []);

  // Update effects when theme changes
  useEffect(() => {
    updateThemeEffects();
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
