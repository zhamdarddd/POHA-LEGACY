import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Stat = {
  value: string;
  label: string;
};

type Props = {
  userName: string;
  period?: string;
  onPeriodPress?: () => void;
  totalClasses: number;
  stats: Stat[];
};

export const LearningReportCard: React.FC<Props> = ({
  userName,
  period = "Monthly",
  onPeriodPress,
  totalClasses,
  stats,
}) => {
  return (
    <View style={styles.card}>
      {/* Period selector */}
      <TouchableOpacity
        style={styles.periodBtn}
        onPress={onPeriodPress}
        activeOpacity={0.8}
      >
        <Text style={styles.periodText}>{period}</Text>
        <Feather
          name="chevron-down"
          size={18}
          color="#EC407A"
          style={{ marginLeft: 3 }}
        />
      </TouchableOpacity>

      <Text style={styles.title}>{userName}</Text>
      <Text style={styles.subtitle}>
        Played a total of {totalClasses} classes this {period.toLowerCase()}.
      </Text>

      <View style={styles.statsRow}>
        {stats.map((stat, idx) => (
          <View style={styles.statBox} key={stat.label}>
            <View style={styles.statIconCircle}>
              <Feather name="file-text" size={30} color="#A770EF" />
              <View style={styles.arc} />
              {/* You can add a background SVG or watermark here if desired */}
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgba(186,104,200,0.25)",
    backgroundColor: "#fff",
    padding: 18,
    margin: 8,
    marginTop: 24,
    marginBottom: 24,
    position: "relative",
    alignItems: "center",
  },
  periodBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F2E6FF",
    backgroundColor: "#F8F5FF",
    paddingVertical: 3,
    paddingHorizontal: 14,
    zIndex: 2,
  },
  periodText: {
    color: "#EC407A",
    fontWeight: "600",
    fontSize: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#263042",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 4,
    letterSpacing: 0.1,
  },
  subtitle: {
    fontSize: 15.5,
    color: "#7a8592",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 3,
    width: "100%",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F8F5FF",
    borderRadius: 14,
    paddingVertical: 16,
    marginHorizontal: 3,
    shadowColor: "#B980EF",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
    minWidth: 90,
  },
  statIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#ECE9F7",
    position: "relative",
  },
  arc: {
    position: "absolute",
    top: 4,
    left: 4,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderColor: "#A770EF",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#EC407A",
    borderTopColor: "#A770EF",
    opacity: 0.8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222B45",
    marginBottom: 0,
  },
  statLabel: {
    fontSize: 14,
    color: "#A1A1A1",
    fontWeight: "500",
    marginTop: 2,
    textAlign: "center",
  },
});
