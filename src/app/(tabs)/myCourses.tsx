import CourseTabSwitcher from "@/src/components/CourseTabSwitcher";
import StreakTracker from "@/src/components/StreakTracker";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyCourses = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header
        <View style={styles.headerGroup}>
          <Text style={styles.header}>Find best {"\n"}course for you</Text>
          <Text style={styles.subheader}>
            Your enrolled & saved courses in one place
          </Text>
        </View> */}
        {/* Streak Tracker */}
        <View style={styles.streakTracker}>
          <StreakTracker />
        </View>
        {/* Course Tabs */}
        <View style={styles.tabSwitcherContainer}>
          <CourseTabSwitcher />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyCourses;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: -32,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 58,
    gap: 16,
  },
  headerGroup: {
    gap: 4,
    marginBottom: 8,
  },
  header: {
    marginTop: 12,
    fontSize: 42,
    fontWeight: "700",
    color: "#2c3e50",
    textAlign: "left",
  },
  subheader: {
    fontSize: 20,
    color: "#7f8c8d",
  },
  streakTracker: {},
  tabSwitcherContainer: {
    marginTop: 10,
    zIndex: 1,
  },
});
