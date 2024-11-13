import React from "react";
import { View } from "react-native";
import { Audio } from "expo-av";

interface ProgressProps {
  sound: Audio.Sound | null;
  isPlaying: boolean;
}

export function Progress({ sound, isPlaying }: ProgressProps) {
  const [position, setPosition] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const progressInterval = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    const updateProgress = async () => {
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis || 0);
        }
      }
    };

    if (isPlaying) {
      progressInterval.current = setInterval(updateProgress, 100);
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [sound, isPlaying]);

  const progress = duration > 0 ? position / duration : 0;

  return (
    <View className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <View
        className="h-full bg-primary"
        style={{ width: `${progress * 100}%` }}
      />
    </View>
  );
}
