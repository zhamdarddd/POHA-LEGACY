import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface StreakCardProps {
  streakLabel: string;
  badgeImage?: any; // require or {uri}
  highlight?: string;
}

export const StreakCard: React.FC<StreakCardProps> = ({
  streakLabel,
  badgeImage = require("../../assets/images/streak-icon.png"), // 2nd
  // Example local asset
  highlight = "Best One",
}) => (
  <View style={styles.container}>
    <View style={styles.left}>
      <View style={styles.iconBg}>
        <Image source={badgeImage} style={styles.icon} />
      </View>
      <Text style={styles.label}>{streakLabel}</Text>
    </View>
    <Text style={styles.highlight}>{highlight}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "rgba(186, 104, 200, 0.2)",
    marginHorizontal: 8,
    padding: 14,
    justifyContent: "space-between",
    marginBottom: 6,
    width: "100%",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBg: {
    width: 38,
    height: 38,
    backgroundColor: "#F7F2FF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  label: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222B45",
  },
  highlight: {
    fontSize: 15,
    fontWeight: "700",
    color: "#EC407A",
    opacity: 0.68,
  },
});
