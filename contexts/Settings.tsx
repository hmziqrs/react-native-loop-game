import React, { createContext, useContext, useState, useEffect } from "react";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface SettingsContextType {
  mp3: string;
  player: Audio.Sound | null;
  setPlayer: (mp3: string, play?: boolean, cache?: boolean) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType>(
  {} as SettingsContextType,
);

const STORAGE_KEYS = {
  MP3: "default_mp3",
};

export const MP3S = {
  ambient: "ambient.mp3",
  forest: "forest.mp3",
  piano: "piano.mp3",
} as const;

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState({
    mp3: MP3S.piano,
    player: null as Audio.Sound | null,
  });

  const loadSound = async (mp3: string, play = false, cache = false) => {
    try {
      // Unload previous sound if exists
      if (state.player) {
        await state.player.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        require(`../assets/sounds/${mp3}`),
        { isLooping: true },
      );

      if (play) {
        await sound.playAsync();
      }

      if (cache) {
        await AsyncStorage.setItem(STORAGE_KEYS.MP3, mp3);
      }

      setState({ mp3, player: sound });
    } catch (error) {
      console.error("Error loading sound", error);
    }
  };

  useEffect(() => {
    // Initialize audio
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    });

    // Load cached MP3 preference
    AsyncStorage.getItem(STORAGE_KEYS.MP3).then((cached) => {
      if (cached && cached !== state.mp3) {
        loadSound(cached);
      }
    });

    return () => {
      // Cleanup
      if (state.player) {
        state.player.unloadAsync();
      }
    };
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        ...state,
        setPlayer: loadSound,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
