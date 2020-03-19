import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Player } from '@react-native-community/audio-toolkit';
import PropTypes from 'prop-types';

export const SettingsContext = createContext();

const KEYS = {
  MP3: 'default_mp3',
};

export const MP3S = {
  ambient: 'ambient.mp3',
  forest: 'forest.mp3',
  paino: 'piano.mp3',
};

const playerConfig = {
  continuesToPlayInBackground: false,
  autoDestroy: false,
};

export default function SettingsContextProvider({ children }) {
  const [state, setState] = useState({
    init: false,
    mp3: MP3S.paino,
  });
  function getNewPlayer(mp3, play = false, cache = false) {
    const newPlayer = new Player(mp3, playerConfig);
    newPlayer.looping = true;
    if (play) {
      newPlayer.prepare((err) => {
        if (!err) {
          newPlayer.play();
        }
      });
    }
    if (cache) {
      AsyncStorage.setItem(KEYS.MP3, mp3);
    }
    return newPlayer;
  }
  const [player, setPlayer] = useState(getNewPlayer(MP3S.paino));
  const safeSetState = (newState) => setState({ ...state, ...newState });
  const safeSetPlayer = (mp3, ...p) => {
    setPlayer(getNewPlayer(mp3, ...p));
    safeSetState({ mp3 });
  };

  async function initApp() {
    try {
      const cache = await AsyncStorage.getItem(KEYS.MP3);
      if (cache && cache !== state.mp3) {
        safeSetState({ ...state, init: true, mp3: cache });
        safeSetPlayer(cache);
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

  return (
    <SettingsContext.Provider
      value={{
        ...state,
        player,
        getPlayer: () => player,
        setState: safeSetState,
        setPlayer: safeSetPlayer,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

SettingsContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
