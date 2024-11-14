import { analytics } from "@/service/firebase";

export const SettingsAnalytics = {
  // Track settings screen view
  trackScreenView: () => {
    analytics.logEvent("settings_screen_view", {
      timestamp: Date.now(),
    });
  },

  // Volume changes
  trackVolumeChange: (oldVolume: number, newVolume: number) => {
    analytics.logEvent("volume_change", {
      old_volume: Math.round(oldVolume * 100),
      new_volume: Math.round(newVolume * 100),
      change_amount: Math.round((newVolume - oldVolume) * 100),
      timestamp: Date.now(),
    });
  },

  // Sound track changes
  trackSoundTrackChange: (oldTrack: string, newTrack: string) => {
    analytics.logEvent("sound_track_change", {
      old_track: oldTrack.replace(".mp3", ""),
      new_track: newTrack.replace(".mp3", ""),
      timestamp: Date.now(),
    });
  },

  // Theme changes
  trackThemeChange: (oldTheme: string, newTheme: string) => {
    analytics.logEvent("theme_change", {
      old_theme: oldTheme,
      new_theme: newTheme,
      timestamp: Date.now(),
    });
  },

  // Track audio player interactions
  trackAudioPlayerInteraction: (
    action: "play" | "pause" | "seek",
    trackName: string,
    position?: number,
  ) => {
    analytics.logEvent("audio_player_interaction", {
      action,
      track_name: trackName.replace(".mp3", ""),
      position,
      timestamp: Date.now(),
    });
  },

  // Track settings errors
  trackSettingsError: (errorType: string, errorMessage: string) => {
    analytics.logEvent("settings_error", {
      error_type: errorType,
      error_message: errorMessage,
      timestamp: Date.now(),
    });
  },
};
