import { Tabs, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Import Outline Icons
import ExploreOutlineIcon from "../../assets/icons/exploreOutline.svg";
import HomeOutlineIcon from "../../assets/icons/homeOutline.svg";
import LeaderboardOutlineIcon from "../../assets/icons/leaderboardOutline.svg";
import MyCoursesOutlineIcon from "../../assets/icons/myCoursesOutline.svg";

// Import Filled Icons
import ExploreFilledIcon from "../../assets/icons/exploreFill.svg";
import HomeFilledIcon from "../../assets/icons/homeFill.svg";
import LeaderboardFilledIcon from "../../assets/icons/leaderboardFill.svg";
import MyCoursesFilledIcon from "../../assets/icons/myCoursesFill.svg";

export default function TabsLayout() {
  const router = useRouter();

  return (
    <>
      <StatusBar backgroundColor={"#f4f4f4"} barStyle={"dark-content"} />
      <Tabs
        screenOptions={({ route }) => {
          const isHeaderVisible =
            route.name === "index" ||
            route.name === "myCourses" ||
            route.name === "leaderboard";
          return {
            tabBarIcon: ({ focused, size }) => {
              let IconComponent;
              switch (route.name) {
                case "index":
                  IconComponent = focused ? HomeFilledIcon : HomeOutlineIcon;
                  break;
                case "explore":
                  IconComponent = focused
                    ? ExploreFilledIcon
                    : ExploreOutlineIcon;
                  break;
                case "myCourses":
                  IconComponent = focused
                    ? MyCoursesFilledIcon
                    : MyCoursesOutlineIcon;
                  break;
                case "leaderboard":
                  IconComponent = focused
                    ? LeaderboardFilledIcon
                    : LeaderboardOutlineIcon;
                  break;
                default:
                  IconComponent = null;
              }
              return IconComponent ? (
                <IconComponent width={size} height={size} />
              ) : null;
            },
            tabBarStyle: {
              position: "absolute",
              height: 74,
              paddingTop: 6,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              borderColor: "lightgray",
              shadowColor: "rgba(0, 0, 0, 1)",
              shadowOffset: { width: 0, height: -5 },
              shadowRadius: 20,
              shadowOpacity: 1,
              backgroundColor: "#fff",
              borderStyle: "solid",
              borderWidth: 1,
              overflow: "hidden",
            },
            tabBarLabelStyle: {
              fontSize: 12,
            },
            tabBarActiveTintColor: "#C50000",
            tabBarInactiveTintColor: "gray",
            headerShown: isHeaderVisible,
            headerTitle:
              route.name === "index" || route.name === "myCourses"
                ? () => (
                    <Image
                      source={require("../../assets/images/logoSM.png")}
                      style={styles.logo}
                    />
                  )
                : route.name === "leaderboard"
                ? () => (
                    <View style={styles.headerTitleContainer}>
                      <Text style={styles.leaderboardTitle}>Leaderboard</Text>
                    </View>
                  )
                : undefined,
            headerTitleAlign: route.name === "leaderboard" ? "center" : "left",
            headerLeft:
              route.name === "leaderboard"
                ? () => (
                    <View style={styles.leaderboardDotsCircle}>
                      <View style={styles.dotsRow}>
                        <View style={styles.leaderboardDot} />
                        <View style={styles.leaderboardDot} />
                      </View>
                      <View style={styles.dotsRow}>
                        <View style={styles.leaderboardDot} />
                        <View style={styles.leaderboardDot} />
                      </View>
                    </View>
                  )
                : undefined,
            headerRight:
              route.name === "leaderboard"
                ? () => (
                    <TouchableOpacity
                      onPress={() => router.push("/ProfileScreen")}
                      activeOpacity={0.7}
                    >
                      <Image
                        source={{ uri: "https://i.pravatar.cc/100" }}
                        style={styles.avatar}
                      />
                    </TouchableOpacity>
                  )
                : route.name === "index" || route.name === "myCourses"
                ? () => (
                    <View style={styles.headerRightContainer}>
                      <Text style={styles.userName}>Welcome, Zahid!</Text>
                      <TouchableOpacity
                        onPress={() => router.push("/ProfileScreen")}
                        activeOpacity={0.7}
                      >
                        <Image
                          source={{ uri: "https://i.pravatar.cc/100" }}
                          style={styles.avatar}
                        />
                      </TouchableOpacity>
                    </View>
                  )
                : undefined,
            headerStyle: {
              backgroundColor: "transparent",
              elevation: 0,
              shadowOpacity: 0,
            },
            headerBackTitleVisible: false,
            headerTintColor: "#2c3e50",
          };
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="explore" options={{ title: "Explore" }} />
        <Tabs.Screen name="myCourses" options={{ title: "My Courses" }} />
        <Tabs.Screen name="leaderboard" options={{ title: "Leaderboard" }} />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 40,
    width: 56,
    resizeMode: "contain",
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    marginRight: 8,
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 18,
    color: "#2c3e50",
    textAlign: "left",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#ccc",
    borderStyle: "solid",
    borderColor: "#2c3e50",
    borderWidth: 2,
    marginRight: 16,
  },
  leaderboardDotsCircle: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  leaderboardDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2c3e50",
    margin: 2,
  },
  leaderboardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2c3e50",
    letterSpacing: 0.2,
    textAlign: "center",
  },
});
