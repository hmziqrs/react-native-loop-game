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

const STORAGE_KEYS = {
  THEME: "theme",
} as const;

export const THEMES = {
  default: "default",
  light: "light",
  dark: "dark",
} as const;

type ThemeType = (typeof THEMES)[keyof typeof THEMES];

interface ThemeState {
  init: boolean;
  theme: ThemeType;
}

interface ThemeContextType extends ThemeState {
  isDark: boolean;
  setTheme: (theme: ThemeType) => Promise<void>;
  setDefaultStatusBar: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [state, setState] = useState<ThemeState>({
    init: false,
    theme: THEMES.default,
  });

  const { colorScheme } = useColorScheme();
  const isDark =
    state.theme === THEMES.dark ||
    (state.theme === THEMES.default && colorScheme === "dark");

  const setDefaultStatusBar = () => {
    StatusBar.setBarStyle(isDark ? "light-content" : "dark-content", true);
  };

  useEffect(() => {
    setDefaultStatusBar();
  }, [isDark]);

  const setTheme = async (theme: ThemeType) => {
    if (theme === state.theme) return;

    try {
      setState((prev) => ({ ...prev, theme }));
      await AsyncStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.error("Failed to set theme:", e);
    }
  };

  const initApp = async () => {
    try {
      const cache = (await AsyncStorage.getItem(
        STORAGE_KEYS.THEME,
      )) as ThemeType | null;
      if (cache && cache !== state.theme) {
        setState({ init: true, theme: cache });
      } else {
        setState((prev) => ({ ...prev, init: true }));
      }
    } catch (e) {
      console.error("Failed to initialize theme:", e);
    }
  };

  useEffect(() => {
    if (!state.init) {
      initApp();
    }
  }, [state.init]);

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        isDark,
        setTheme,
        setDefaultStatusBar,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
