import { View, FlatList, Text } from "react-native";
import LeaderboardCard from "../components/LeaderboardCard";
import { useTheme } from "../context/ThemeContext";

const mockBoard = [
  { id: "1", name: "Alice", score: 95 },
  { id: "2", name: "Bob", score: 90 },
  { id: "3", name: "You", score: 88 },
];

export default function BoardScreen() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", color: colors.text }}>
        Leaderboard
      </Text>
      <FlatList
        data={mockBoard}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LeaderboardCard entry={item} />}
      />
    </View>
  );
}
