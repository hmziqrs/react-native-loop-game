import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { GameEngine } from "@/components/GameEngine";
import { PageView } from "@/components/PageView";

export default function GameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const level = parseInt(id, 10);

  return (
    <PageView>
      <GameEngine level={level} />
    </PageView>
  );
}
