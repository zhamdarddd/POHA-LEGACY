import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  percentage: number;
};

export const RankStatusBanner: React.FC<Props> = ({ percentage }) => {
  return (
    <LinearGradient
      colors={["#ec407a", "#a770ef"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.borderGradient}
    >
      <View style={styles.innerContainer}>
        <LinearGradient
          colors={["#fff", "#f8eaf9", "#e7c2ee"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.leftBadge}
        >
          <Text style={styles.leftBadgeText}>1#</Text>
        </LinearGradient>
        <Text style={styles.text}>
          You are doing better than{" "}
          <Text style={styles.percent}>{percentage}%</Text> of other players!
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  borderGradient: {
    borderRadius: 16,
    padding: 1.5,
    alignSelf: "stretch",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#fff",
    minHeight: 66,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  leftBadge: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },
  leftBadgeText: {
    color: "#C84CB6",
    fontWeight: "500",
    fontSize: 18,
    letterSpacing: 0.15,
  },
  text: {
    color: "#B45CB3",
    fontWeight: "400",
    fontSize: 17,
    letterSpacing: 0.02,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  percent: {
    color: "#D978BE",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.02,
  },
});
