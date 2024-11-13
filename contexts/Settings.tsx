import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useRef,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

const STORAGE_KEYS = {
  MP3: "default_mp3",
  VOLUME: "volume_level",
} as const;

export const MP3S = {
  ambient: "ambient.mp3",
  forest: "forest.mp3",
  piano: "piano.mp3",
} as const;

export type MP3Type = (typeof MP3S)[keyof typeof MP3S];

const MP3_SOURCES: Record<MP3Type, any> = {
  [MP3S.ambient]: require("../assets/audio/ambient.mp3"),
  [MP3S.forest]: require("../assets/audio/forest.mp3"),
  [MP3S.piano]: require("../assets/audio/piano.mp3"),
};

interface SettingsState {
  initialized: boolean;
  currentTrack: MP3Type;
  isPlaying: boolean;
  volume: number;
  error: string | null;
  audio: Audio.Sound | null,
}

interface SettingsContextType extends Omit<SettingsState, "error"> {
  changeAudio: (track: MP3Type) => Promise<void>;
  playAudio: () => Promise<void>;
  pauseAudio: () => Promise<void>;
  resumeAudio: () => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
}

const defaultState: SettingsState = {
  initialized: false,
  currentTrack: MP3S.piano,
  isPlaying: false,
  volume: 1.0,
  error: null,
  audio: null,
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SettingsState>(defaultState);
  const ins = useRef<Audio.SoundObject | null>(); // Create Sound instance in ref

  const updateState = (updates: Partial<SettingsState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const setupAudioMode = async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error("Error setting audio mode:", error);
      updateState({ error: "Failed to setup audio mode" });
    }
  };

  const loadAudio = async (track: MP3Type): Promise<boolean> => {
    try {
      if (state.initialized && state.currentTrack === track) return true;
      // Unload current audio if loaded
      if (ins.current?.status.isLoaded) {
        await ins.current?.sound?.unloadAsync();
      }

      ins.current = await Audio.Sound.createAsync(
        MP3_SOURCES[track],
        {
          isLooping: true,
          volume: state.volume,
          shouldPlay: false,
          progressUpdateIntervalMillis: 100,
        },
        onPlaybackStatusUpdate,
        true, // downloadFirst
      );

      // Set up status update callback
      // ins.current!.sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

      await AsyncStorage.setItem(STORAGE_KEYS.MP3, track);
      updateState({ currentTrack: track, error: null });

      return true;
    } catch (error) {
      console.error("Error loading audio:", error);
      updateState({ error: "Failed to load audio" });
      return false;
    }
  };

  // useless it was causing rerenders
  const onPlaybackStatusUpdate = (status: any) => {
    // console.log("UEE");
    // if (status.isLoaded) {
    //   // updateState({
    //   //   isPlaying: status.isPlaying,
    //   //   error: null,
    //   // });
    // } else if (status.error) {
    //   // updateState({
    //   //   error: `Playback error: ${status.error}`,
    //   // });
    // }
  };

  const changeAudio = async (track: MP3Type) => {
    try {
      // Don't reload if it's the same track
      if (track === state.currentTrack) {
        const status = await ins.current?.sound.getStatusAsync();
        if (!status?.isLoaded) return;
      } 

      const wasPlaying = state.isPlaying;

      // Pause current playback if playing
      if (state.isPlaying) {
        await pauseAudio();
      }


      // Load and play new track if previous was playing
      const loaded = await loadAudio(track);
      if (loaded && wasPlaying) {
        await ins.current!.sound.playAsync();
      }
    } catch (error) {
      console.error("Error changing audio:", error);
      updateState({ error: "Failed to change audio" });
    }
  };

  const playAudio = async () => {
    try {
      const status = await ins.current?.sound.getStatusAsync();
      if (!status?.isLoaded) {
        const loaded = await loadAudio(state.currentTrack);
        if (!loaded) return;
      }

      await ins.current!.sound.playAsync();
      updateState({ isPlaying: true, error: null });
    } catch (error) {
      console.error("Error playing audio:", error);
      updateState({ error: "Failed to play audio" });
    }
  };

  const pauseAudio = async () => {
    try {
      if (ins.current?.status.isLoaded) {
        await ins.current!.sound.pauseAsync();
        updateState({ isPlaying: false, error: null });
      }
    } catch (error) {
      console.error("Error pausing audio:", error);
      updateState({ error: "Failed to pause audio" });
    }
  };

  const resumeAudio = async () => {
    try {
      if (ins.current?.status.isLoaded) {
        await ins.current!.sound.playAsync();
        updateState({ isPlaying: true, error: null });
      }
    } catch (error) {
      console.error("Error resuming audio:", error);
      updateState({ error: "Failed to resume audio" });
    }
  };

  const setVolume = async (newVolume: number) => {
    try {
      if (ins.current?.status.isLoaded) {
        await ins.current!.sound.setVolumeAsync(newVolume);
        await AsyncStorage.setItem(STORAGE_KEYS.VOLUME, newVolume.toString());
        updateState({ volume: newVolume, error: null });
      }
    } catch (error) {
      console.error("Error setting volume:", error);
      updateState({ error: "Failed to set volume" });
    }
  };

  const initializeAudio = async () => {
    try {
      await setupAudioMode();

      // Load cached settings
      const [cachedTrack, cachedVolume] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.MP3),
        AsyncStorage.getItem(STORAGE_KEYS.VOLUME),
      ]);

      // Update state with cached values
      if (cachedVolume) {
        updateState({ volume: parseFloat(cachedVolume) });
      }

      // Load the cached track or default
      const trackToLoad = (cachedTrack as MP3Type) || state.currentTrack;
      await loadAudio(trackToLoad);

      updateState({ initialized: true });
    } catch (error) {
      console.error("Error initializing audio:", error);
      updateState({
        initialized: true,
        error: "Failed to initialize audio",
      });
    }
  };

  // Initialize on mount
  React.useEffect(() => {
    if (!state.initialized) {
      initializeAudio();
    }
  }, [state.initialized]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      ins.current?.sound.unloadAsync();
    };
  }, []);

  const contextValue: SettingsContextType = {
    initialized: state.initialized,
    currentTrack: state.currentTrack,
    isPlaying: state.isPlaying,
    volume: state.volume,
    changeAudio,
    playAudio,
    pauseAudio,
    resumeAudio,
    setVolume,
    audio: ins.current?.sound ?? null,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}
