import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Share, StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  userName: string;
  courses: number;
};

export const ShareCoursesButton: React.FC<Props> = ({ userName, courses }) => {
  const onShare = async () => {
    try {
      await Share.share({
        message: `${userName} has completed ${courses} courses on the app!`,
      });
    } catch (e) {
      // Handle error if needed
    }
  };
  return (
    <LinearGradient
      colors={["#EC407A", "#A770EF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <TouchableOpacity
        style={styles.btn}
        onPress={onShare}
        activeOpacity={0.88}
      >
        <Ionicons
          name="share-social-outline"
          size={22}
          color="#fff"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.text}>Share my Courses</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
    marginTop: 20,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
