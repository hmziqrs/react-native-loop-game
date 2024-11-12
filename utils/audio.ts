import { Audio } from "expo-av";

export async function loadAudio(fileUri: string): Promise<Audio.Sound> {
  try {
    const { sound } = await Audio.Sound.createAsync(require(fileUri), {
      shouldPlay: false,
      isLooping: true,
    });
    return sound;
  } catch (error) {
    console.error("Error loading audio:", error);
    throw error;
  }
}

export function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
