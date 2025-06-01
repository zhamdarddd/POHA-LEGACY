import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

// Medals: [silver, gold, bronze]
const medalImages = [
  require("../../assets/images/leaderboard/silver.png"), // 2nd
  require("../../assets/images/leaderboard/gold.png"), // 1st
  require("../../assets/images/leaderboard/bronze.png"), // 3rd
];

// Podium settings
const AVATAR_SIZES = [60, 74, 60]; // [2nd, 1st, 3rd] - make them minimal & without medal image background

// Types
type PodiumUser = {
  name: string;
  location: string;
  points: number;
  avatar: string;
};
type Props = {
  users: PodiumUser[]; // [2nd, 1st, 3rd]
};

const STAGE_NUMBERS = ["2", "1", "3"];

// Podium top widths for each rank
const PODIUM_TOP_WIDTHS = [60, 60, 60]; // all 60 for symmetry
const ANGLED_WIDTH = 16; // controls how steep/long the angle is

// Custom font sizes for podium numbers
const PODIUM_NUMBER_FONT_SIZES = [64, 96, 64];

export const TopThreePodium: React.FC<Props> = ({ users }) => (
  <View style={styles.wrapper}>
    <View style={styles.podiumRow}>
      {users.map((user, i) => (
        <View style={styles.podiumCol} key={i}>
          {/* Minimal Avatar */}
          <View
            style={[
              styles.avatarMinimalWrap,
              {
                width: AVATAR_SIZES[i],
                height: AVATAR_SIZES[i],
                borderRadius: AVATAR_SIZES[i] / 2,
                marginBottom: 6,
                marginTop: i === 1 ? 9 : 18,
                borderColor: "#fff",
                borderWidth: 3,
              },
            ]}
          >
            <Image
              source={{ uri: user.avatar }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: AVATAR_SIZES[i] / 2,
              }}
            />
          </View>
          {/* Medal icon (small, minimal, just as indicator) */}
          <Image
            source={medalImages[i]}
            style={[
              styles.medalIcon,
              i === 1 && styles.medalIconFirst,
              i === 0 && styles.medalIconSecond,
              i === 2 && styles.medalIconThird,
            ]}
            resizeMode="contain"
          />

          {/* Points */}
          <View style={styles.pointsPill}>
            <Text style={styles.points}>{user.points} Pts</Text>
          </View>

          {/* Name */}
          <Text style={styles.name}>{user.name}</Text>

          {/* Podium block */}
          <View style={styles.individualPodium}>
            {/* Upside-down podium top with angled-corner effect for all ranks */}
            <View
              style={[
                styles.podiumTopFaceContainer,
                styles.podiumTopFaceContainerAll,
                styles.flipped, // Flip the top rectangle upside down
                {
                  width: PODIUM_TOP_WIDTHS[i] + ANGLED_WIDTH * 2,
                  minWidth: PODIUM_TOP_WIDTHS[i] + ANGLED_WIDTH * 2,
                },
              ]}
            >
              {/* Left angled triangle */}
              <View style={styles.leftTriangle} />
              {/* Main top face */}
              <LinearGradient
                colors={["#ffbdd6", "#ffbdd6"]}
                style={[
                  styles.podiumTopFace,
                  {
                    width: PODIUM_TOP_WIDTHS[i],
                    minWidth: PODIUM_TOP_WIDTHS[i],
                  },
                  styles.topAll,
                ]}
              />
              {/* Right angled triangle */}
              <View style={styles.rightTriangle} />
            </View>
            <LinearGradient
              colors={["#ff90bb", "#ff4477"]}
              style={[
                styles.podiumFrontFace,
                i === 2 && styles.frontFirst,
                i === 0 && styles.frontSecond,
                i === 2 && styles.frontThird,
              ]}
            >
              <Text
                style={[
                  styles.podiumNumber,
                  { fontSize: i === 1 ? 120 : i === 0 ? 88 : 66 }, // 1st: 96, 2nd: 64, 3rd: 40
                ]}
              >
                {STAGE_NUMBERS[i]}
              </Text>
            </LinearGradient>
          </View>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: -24,
    marginBottom: -34,
  },
  podiumRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
  },
  podiumCol: {
    alignItems: "center",
    minWidth: 90,
    flex: 1,
  },
  // MINIMAL AVATAR
  avatarMinimalWrap: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  // MINIMAL MEDAL ICON (just small indicator, not background)
  medalIcon: {
    width: 28,
    height: 28,
    position: "absolute",
    top: 8,
    right: "50%",
    marginRight: -14,
    zIndex: 3,
  },
  medalIconFirst: {
    top: 2,
    width: 36,
    height: 36,
    marginRight: -18,
  },
  medalIconSecond: {
    top: 10,
    width: 28,
    height: 28,
    marginRight: -14,
  },
  medalIconThird: {
    top: 16,
    width: 28,
    height: 28,
    marginRight: -14,
  },
  name: {
    color: "#2c3e50",
    fontSize: 18,
    fontWeight: "600",
    marginTop: -4,
    textAlign: "center",
    marginBottom: 8,
  },
  pointsPill: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: -16,
    marginBottom: 8,
  },
  points: {
    color: "#2C3E50",
    fontWeight: "500",
    fontSize: 14,
    textAlign: "center",
  },

  // ✅ Podium Design Under Each Rank
  individualPodium: {
    alignItems: "center",
    marginTop: 10,
  },
  podiumTopFaceContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 130,
  },
  podiumTopFaceContainerAll: {
    height: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  podiumTopFace: {
    minWidth: 60,
    height: 16,
    zIndex: -2,
    marginBottom: -3,
    shadowColor: "#FC6E6E",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  topAll: {
    height: 16,
    width: 88,
    marginBottom: 0,
    zIndex: 2,
  },

  // Angled corners for all podiums
  leftTriangle: {
    position: "absolute",
    left: -14,
    top: 0,
    width: 0,
    height: 0,
    borderTopWidth: 16,
    borderTopColor: "#ffbdd6",
    borderLeftWidth: ANGLED_WIDTH,
    borderLeftColor: "transparent",
    borderRightWidth: 0,
    borderRightColor: "transparent",
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    zIndex: 3,
  },
  rightTriangle: {
    position: "absolute",
    right: -14,
    top: 0,
    width: 0,
    height: 0,
    borderTopWidth: 16,
    borderTopColor: "#ffbdd6",
    borderRightWidth: ANGLED_WIDTH,
    borderRightColor: "transparent",
    borderLeftWidth: 0,
    borderLeftColor: "transparent",
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    zIndex: 3,
  },
  podiumFrontFace: {
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FC6E6E",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    zIndex: 1,
  },
  frontFirst: {
    height: 200,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 53 },
    elevation: 30,
  },
  frontSecond: {
    height: 150,
    zIndex: -5,
  },
  frontThird: {
    height: 120,
    zIndex: -5,
  },
  podiumNumber: {
    color: "#fff",
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 62,
  },
  flipped: {
    transform: [{ scaleY: -1 }],
  },
});

export default TopThreePodium;
