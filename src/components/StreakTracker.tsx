import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type Day = {
  label: string;
  active: boolean;
};

type Props = {
  days?: Day[];
};

const defaultDays: Day[] = [
  { label: "Thu", active: true },
  { label: "Fri", active: true },
  { label: "Sat", active: true },
  { label: "Sun", active: false },
  { label: "Sun", active: true },
];

const StreakTracker: React.FC<Props> = ({ days = defaultDays }) => {
  const streakCount = days.filter((day) => day.active).length;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.streakText}>
        {streakCount} Day{streakCount !== 1 ? "s" : ""} on streak!
      </Text>
      <View style={styles.daysContainer}>
        {days.map((day, index) => (
          <View
            key={index}
            style={[
              styles.dayCard,
              day.active ? styles.activeCard : styles.inactiveCard,
            ]}
          >
            <Image
              source={require("../assets/images/streak-icon.png")}
              style={[
                styles.medalIcon,
                {
                  opacity: day.active ? 1 : 0.4,
                },
              ]}
              resizeMode="contain"
            />
            <Text style={styles.dayLabel}>{day.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default StreakTracker;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    borderColor: "rgba(197, 0, 0, 0.6)",

    borderRadius: 16,
    padding: 16,
    backgroundColor: "#fff",
  },
  streakText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#2c3e50",
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayCard: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    width: 60,
  },
  activeCard: {
    backgroundColor: "rgba(197, 0, 0, 0.2)",
  },
  inactiveCard: {
    backgroundColor: "#ecf0f1",
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#34495e",
    marginTop: 6,
  },
  medalIcon: {
    width: 32,
    height: 32,
  },
});
