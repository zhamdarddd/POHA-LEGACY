import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

type User = {
  rank: number;
  name: string;
  avatar: string;
  course: string;
  badges: number;
  points: number;
  isCurrentUser?: boolean;
};

type Props = {
  users: User[];
  scrollEnabled?: boolean;
};

export const RankedUserList: React.FC<Props> = ({
  users,
  scrollEnabled = true,
}) => {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.rank.toString()}
      renderItem={({ item }) => {
        const content = (
          <View
            style={[styles.card, item.isCurrentUser && styles.currentUserCard]}
          >
            <Text
              style={[
                styles.rankNum,
                item.isCurrentUser && styles.rankNumActive,
              ]}
            >
              {item.rank.toString().padStart(2, "0")}
            </Text>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.one}>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.two}>
                  <Text style={styles.course}>{item.course}</Text>
                  <View style={styles.badgePointGroup}>
                    <LinearGradient
                      colors={["#f4e0ff", "#f8bbd0"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.pointsContainer}
                    >
                      <Text style={styles.pointsText}>{item.points} Pts</Text>
                    </LinearGradient>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
        if (item.isCurrentUser) {
          return (
            <LinearGradient
              colors={["#fff", "#fff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientBorder}
            >
              {content}
            </LinearGradient>
          );
        }
        return content;
      }}
      contentContainerStyle={{ paddingVertical: 0 }}
      style={{ width: "100%" }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollEnabled}
    />
  );
};

const styles = StyleSheet.create({
  one: {
    flex: 1,
  },
  two: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F5F7",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  currentUserCard: {
    borderWidth: 2,
    borderColor: "#EC407A",
  },
  gradientBorder: {
    borderRadius: 22,
    marginVertical: 4,
    paddingLeft: 1,
    paddingRight: 1,
  },
  rankNum: {
    fontWeight: "500",
    fontSize: 20,
    color: "#222B45",
    marginRight: 12,
    textAlign: "center",
  },
  rankNumActive: {
    color: "#EC407A",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 28,
    marginRight: 10,
    backgroundColor: "#d9d9d9",
  },
  info: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontWeight: "700",
    fontSize: 18,
    color: "#222B45",
  },
  course: {
    fontSize: 14,
    color: "#FF8200",
    fontWeight: "600",
  },
  badgePointGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 16,
  },
  pointsContainer: {
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  pointsText: {
    fontWeight: "500",
    fontSize: 14,
    color: "#EC407A",
  },
});
