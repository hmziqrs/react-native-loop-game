import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

export const SettingsContext = createContext();

const KEYS = {
  MP3: 'default_mp3',
};

const mp3s = {
  ambient: 'ambient.mp3',
  forest: 'forest.mp3',
  paino: 'paino.mp3',
};

export default function SettingsContextProvider({ children }) {
  const [state, setState] = useState({
    init: false,
    defaultMp3: mp3s.paino,
  });

  async function initApp() {
    try {
      const cache = await AsyncStorage.getItem(KEYS.MP3);
      console.log('CACHE', cache);
      setState({ ...state, init: true });
    } catch (e) {
      // e
    }
  }

  useEffect(() => {
    if (!state.init) {
      initApp();
    }
  }, [state.init]);

  return <SettingsContext.Provider value={{ ...state }}>{children}</SettingsContext.Provider>;
}

SettingsContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
