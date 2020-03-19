import React, { useEffect } from 'react';
import { StatusBar, UIManager } from 'react-native';
import analytics from '@react-native-firebase/analytics';

// It's necessary to call init here to load & initialize required libraries
import './init';

import { getActiveRouteName } from 'rn-hgl/utils';
import { isIOS } from 'rn-hgl/platform';

import { colors } from 'configs';

import SettingsContextProvider from 'contexts/Settings';

import Navigator from './Navigator';
import routesMap from './routes.map';

function onRouteChange(prevState, currentState) {
  const currentScreen = getActiveRouteName(currentState);
  const prevScreen = getActiveRouteName(prevState);
  if (prevScreen !== currentScreen) {
    analytics().setCurrentScreen(currentScreen, currentScreen);
    StatusBar.setBarStyle(routesMap[currentScreen].statusBar);
  }
}

function initStatusbar() {
  if (!isIOS) {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor(colors.alpha);
  }
}

function App() {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const timeout = setTimeout(initStatusbar, 100);

  initStatusbar();
  useEffect(() => () => {
    clearTimeout(timeout);
  });

  return (
    <SettingsContextProvider>
      <Navigator onNavigationStateChange={onRouteChange} />
    </SettingsContextProvider>
  );
}

export default App;
