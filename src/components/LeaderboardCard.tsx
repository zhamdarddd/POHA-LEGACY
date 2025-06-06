import { View, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function LeaderboardCard({
  entry,
}: {
  entry: { id: string; name: string; score: number };
}) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        padding: 12,
        marginVertical: 8,
        backgroundColor: colors.card,
        borderRadius: 8,
      }}
    >
      <Text style={{ fontWeight: "bold", color: colors.text }}>
        {entry.name}
      </Text>
      <Text style={{ color: colors.text }}>Score: {entry.score}</Text>
    </View>
  );
}
