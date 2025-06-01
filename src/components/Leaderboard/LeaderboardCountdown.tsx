import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  cycleEnd: Date;
};

function formatCountdown(cycleEnd: Date) {
  const now = new Date();
  let diff = Math.max(0, cycleEnd.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60));
  return `${days.toString().padStart(2, "0")}d ${hours
    .toString()
    .padStart(2, "2")}h ${minutes.toString().padStart(2, "0")}m`;
}

export const LeaderboardCountdown: React.FC<Props> = ({ cycleEnd }) => {
  const countdown = useMemo(() => formatCountdown(cycleEnd), [cycleEnd]);
  return (
    <View style={styles.container}>
      <Ionicons
        name="time-outline"
        size={18}
        color="#EC407A"
        style={{ marginRight: 5 }}
      />
      <Text style={styles.countdownText}>{countdown}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    marginTop: 14,
    marginBottom: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  countdownText: {
    color: "#EC407A",
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 0.05,
  },
});
