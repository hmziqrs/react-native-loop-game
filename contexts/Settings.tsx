import React, { createContext, useState, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

const STORAGE_KEYS = {
  MP3: "default_mp3",
} as const;

export const MP3S = {
  ambient: "ambient.mp3",
  forest: "forest.mp3",
  piano: "piano.mp3",
} as const;

type MP3Type = (typeof MP3S)[keyof typeof MP3S];

interface SettingsState {
  init: boolean;
  mp3: MP3Type;
}

interface SettingsContextType extends SettingsState {
  sound: Audio.Sound | null;
  isPlaying: boolean;
  volume: number;
  setVolume: (volume: number) => Promise<void>;
  playSound: (mp3: MP3Type) => Promise<void>;
  pauseSound: () => Promise<void>;
  resumeSound: () => Promise<void>;
}

export const SettingsContext = createContext<SettingsContextType | null>(null);

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [state, setState] = useState<SettingsState>({
    init: false,
    mp3: MP3S.piano,
  });
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(1.0);

  const loadSound = async (mp3: MP3Type) => {
    try {
      // Unload previous sound if exists
      if (sound) {
        await sound.unloadAsync();
      }

      // Configure audio mode
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });

      // Load new sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        // Adjust the require path based on your asset location
        require(`../assets/audio/${mp3}`),
        {
          isLooping: true,
          volume: volume,
          shouldPlay: false,
        },
      );

      setSound(newSound);
      setState((prev) => ({ ...prev, mp3 }));
      await AsyncStorage.setItem(STORAGE_KEYS.MP3, mp3);

      return newSound;
    } catch (error) {
      console.error("Error loading sound:", error);
      return null;
    }
  };

  const playSound = async (mp3: MP3Type) => {
    try {
      const currentSound =
        sound && state.mp3 === mp3 ? sound : await loadSound(mp3);
      if (currentSound) {
        await currentSound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const pauseSound = async () => {
    try {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Error pausing sound:", error);
    }
  };

  const resumeSound = async () => {
    try {
      if (sound) {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error resuming sound:", error);
    }
  };

  const setVolume = async (newVolume: number) => {
    try {
      if (sound) {
        await sound.setVolumeAsync(newVolume);
      }
      setVolumeState(newVolume);
    } catch (error) {
      console.error("Error setting volume:", error);
    }
  };

  const initApp = async () => {
    try {
      const cache = (await AsyncStorage.getItem(
        STORAGE_KEYS.MP3,
      )) as MP3Type | null;
      if (cache && cache !== state.mp3) {
        await loadSound(cache);
      } else {
        await loadSound(state.mp3);
      }
      setState((prev) => ({ ...prev, init: true }));
    } catch (error) {
      console.error("Error initializing app:", error);
      setState((prev) => ({ ...prev, init: true }));
    }
  };

  React.useEffect(() => {
    if (!state.init) {
      initApp();
    }
  }, [state.init]);

  // Cleanup effect
  React.useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <SettingsContext.Provider
      value={{
        ...state,
        sound,
        isPlaying,
        volume,
        setVolume,
        playSound,
        pauseSound,
        resumeSound,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
