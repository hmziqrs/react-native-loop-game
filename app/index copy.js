import React, { useEffect } from 'react';
import { StatusBar, UIManager } from 'react-native';
import { Provider } from 'react-redux';
import analytics from '@react-native-firebase/analytics';
import 'react-native-gesture-handler';

// It's necessary to call init here to load & initialize required libraries
import './init';

import { getActiveRouteName } from 'rn-hgl/utils';
import { isIOS } from 'rn-hgl/platform';

import { colors } from 'configs';

import Navigator from './Navigator';
import routesMap from './routes.map';
import configureStore from './store';
import Wrapper from './Wrapper';

const store = configureStore();

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
    <Provider store={store}>
      <Wrapper>
        <Navigator onNavigationStateChange={onRouteChange} />
      </Wrapper>
    </Provider>
  );
}

export default App;
