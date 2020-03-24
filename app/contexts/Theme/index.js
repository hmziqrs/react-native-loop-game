import React, { createContext, useState } from 'react';
import { StatusBar, Text } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { useDarkMode, DarkModeProvider } from 'react-native-dark-mode';

import { setText } from 'init';

export const ThemeContext = createContext();

const KEYS = {
  THEME: 'theme',
};

export const THEMES = {
  default: 'default',
  light: 'light',
  dark: 'dark',
};

export default function ThemeContextProvider({ children }) {
  const [state, setState] = useState({
    init: false,
    theme: THEMES.default,
  });
  const safeSetState = (newState) => setState({ ...state, ...newState });
  const isDarkMode = useDarkMode();
  const isDark = state.theme === THEMES.dark || (state.theme === THEMES.default && isDarkMode);
  const props = {};

  function setDefaultStatusBar() {
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content', true);
  }

  setDefaultStatusBar();

  async function setTheme(theme) {
    if (theme === state.theme) {
      return;
    }
    try {
      safeSetState({ theme });
      AsyncStorage.setItem(KEYS.THEME, theme);
    } catch (e) {
      //
    }
  }

  async function initApp() {
    try {
      const cache = await AsyncStorage.getItem(KEYS.THEME);
      if (cache && cache !== state.mp3) {
        safeSetState({ init: true, theme: cache });
      } else {
        safeSetState({ init: true });
      }
    } catch (e) {
      // e
    }
  }

  if (!state.init) {
    initApp();
  }

  if (state.theme !== THEMES.default) {
    props.mode = state.theme;
  }

  setText(isDark);

  return (
    <DarkModeProvider {...props}>
      <ThemeContext.Provider
        value={{
          ...state,
          setTheme,
          setDefaultStatusBar,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </DarkModeProvider>
  );
}

ThemeContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
