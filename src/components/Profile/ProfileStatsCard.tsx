import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProfileStatsCardProps {
  totalPoints: number;
  localRank: string;
  lessons: number;
}

export const ProfileStatsCard: React.FC<ProfileStatsCardProps> = ({
  totalPoints,
  localRank,
  lessons,
}) => (
  <View style={styles.statsCard}>
    <View style={styles.statItem}>
      <MaterialCommunityIcons name="star-outline" size={28} color="#EC407A" />
      <Text style={styles.statLabel}>Total Points</Text>
      <Text style={styles.statValue}>{totalPoints}</Text>
    </View>
    <View style={styles.divider} />
    <View style={styles.statItem}>
      <MaterialCommunityIcons name="orbit" size={28} color="#A770EF" />
      <Text style={styles.statLabel}>Local Rank</Text>
      <Text style={styles.statValue}>{localRank}</Text>
    </View>
    <View style={styles.divider} />
    <View style={styles.statItem}>
      <Feather name="file-text" size={28} color="#FF8200" />
      <Text style={styles.statLabel}>Lessons</Text>
      <Text style={styles.statValue}>{lessons}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  statsCard: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgba(186, 104, 200, 0.2)",
    marginTop: 18,
    marginBottom: 14,
    marginHorizontal: 8,
    paddingVertical: 18,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 15,
    color: "#A1A1A1",
    marginTop: 5,
    marginBottom: 3,
    fontWeight: "500",
  },
  statValue: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222B45",
  },
  divider: {
    width: 1,
    height: 44,
    backgroundColor: "rgba(186, 104, 200, 0.18)",
    borderRadius: 1,
    marginHorizontal: 2,
  },
});
