import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StarItem {
  icon: React.ReactNode;
  label: string;
  owned: boolean;
}

export const LeaderboardStarsCard: React.FC<{ stars: StarItem[] }> = ({
  stars,
}) => (
  <View style={styles.container}>
    {stars.map((star, idx) => (
      <View
        key={star.label}
        style={[
          styles.starRow,
          { backgroundColor: star.owned ? "#FFFBE5" : "#F3F4F7" },
          idx !== 0 && { marginTop: 10 },
        ]}
      >
        <View style={styles.iconWrap}>{star.icon}</View>
        <Text
          style={[styles.label, { color: star.owned ? "#D7A500" : "#7B7B82" }]}
        >
          {star.label}
        </Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 18,
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 13,
    paddingVertical: 15,
    paddingHorizontal: 14,
    width: "100%",
  },
  iconWrap: {
    marginRight: 15,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 4,
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
});
