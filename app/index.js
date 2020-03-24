import React, { useEffect } from 'react';
import { StatusBar, UIManager } from 'react-native';
import analytics from '@react-native-firebase/analytics';

// It's necessary to call init here to load & initialize required libraries
import './init';

import { getActiveRouteName } from 'rn-hgl/utils';
import { isIOS } from 'rn-hgl/platform';

import { colors } from 'configs';

import SettingsContextProvider from 'contexts/Settings';
import ThemeContextProvider from 'contexts/Theme';

import Navigator from './Navigator';

function onRouteChange(prevState, currentState) {
  const currentScreen = getActiveRouteName(currentState);
  const prevScreen = getActiveRouteName(prevState);
  if (prevScreen !== currentScreen) {
    analytics().setCurrentScreen(currentScreen, currentScreen);
  }
}

function initStatusbar() {
  if (!isIOS) {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor(colors.alpha);
  }
}

function App() {
  const timeout = setTimeout(initStatusbar, 100);

  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  initStatusbar();

  useEffect(() => () => {
    clearTimeout(timeout);
  });

  return (
    <ThemeContextProvider>
      <SettingsContextProvider>
        <Navigator onNavigationStateChange={onRouteChange} />
      </SettingsContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
