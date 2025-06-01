import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Course } from "../assets/data/types";
import ActiveCourseCard from "./CourseTabSwitcher/ActiveCourseCard";
import CompletedCourseCard from "./CourseTabSwitcher/CompletedCourseCard";
import DownloadedCourseCard, {
  DownloadedState,
} from "./CourseTabSwitcher/DownloadedCourseCard";

import { downloadedCourses } from "../assets/data/downloadedCourses";
import { popularCourses } from "../assets/data/popularCourses";

// NEW: Import useMyCourses context
import { useMyCourses } from "@/src/context/MyCoursesContext";

type CourseTab = "Active" | "Completed" | "Downloaded";

const CourseTabSwitcher = () => {
  // NEW: Use myCourses from context
  const { myCourses } = useMyCourses();
  const [activeTab, setActiveTab] = useState<CourseTab>("Active");

  const getCourseStatus = (course: Course): string => {
    const progress = course.progress ?? 0;
    if (progress === 1) return "Completed";
    if (progress > 0) return "Ongoing";
    return "Not Started";
  };

  // UPDATED: Use myCourses for active tab
  const getActiveCourses = (): Course[] => {
    return myCourses
      ? myCourses.filter(
          (course) => (course.progress ?? 0) > 0 && (course.progress ?? 0) < 1
        )
      : [];
  };

  // Keep getCompletedCourses and getDownloadedCourses as before.
  const getCompletedCourses = (): Course[] => {
    return popularCourses
      .filter((course) => (course.progress ?? 0) === 1)
      .map((course) => ({
        ...course,
        status: "Completed",
        progress: 1,
      }));
  };

  const getDownloadedCourses = () =>
    downloadedCourses.filter(
      (course) =>
        !!course &&
        typeof course.downloadProgress === "number" &&
        !!course.state &&
        !!course.imageUrl &&
        !!course.title &&
        !!course.instructor
    );

  const tabData: Record<CourseTab, any[]> = {
    Active: getActiveCourses(),
    Completed: getCompletedCourses(),
    Downloaded: getDownloadedCourses(),
  };

  const handleFavorite = (courseId: string) => {
    console.log("Favorite pressed for course:", courseId);
  };

  const handleContinue = (courseId: string) => {
    console.log("Continue pressed for course:", courseId);
  };

  const handleCertificate = (courseId: string) => {
    console.log("Get Certificate pressed for course:", courseId);
  };

  // Download/Share/Open handlers
  const handlePauseDownload = (courseId: string) => {
    console.log("Pause Download pressed for course:", courseId);
  };
  const handleShare = (courseId: string) => {
    console.log("Share course pressed for course:", courseId);
  };
  const handleOpenCourse = (courseId: string) => {
    console.log("Open course pressed for course:", courseId);
  };

  const courses = tabData[activeTab];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {(["Active", "Completed", "Downloaded"] as CourseTab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {courses.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {activeTab === "Active"
                ? "You don't have any active courses"
                : activeTab === "Completed"
                ? "You haven't completed any courses yet"
                : "No downloaded courses"}
            </Text>
          </View>
        ) : (
          <View style={styles.coursesContainer}>
            {activeTab === "Completed"
              ? courses.map((course) =>
                  course ? (
                    <CompletedCourseCard
                      key={course.id}
                      course={course}
                      onPressCertificate={() => handleCertificate(course.id)}
                    />
                  ) : null
                )
              : activeTab === "Downloaded"
              ? courses.map((course) =>
                  course ? (
                    <DownloadedCourseCard
                      key={course.id}
                      course={course}
                      downloadProgress={course.downloadProgress}
                      state={course.state as DownloadedState}
                      onPauseDownload={handlePauseDownload}
                      onShare={handleShare}
                      onOpenCourse={handleOpenCourse}
                    />
                  ) : null
                )
              : courses.map((course) =>
                  course ? (
                    <ActiveCourseCard
                      key={course.id}
                      course={course}
                      onPressFavorite={() => handleFavorite(course.id)}
                      onPressContinue={() => handleContinue(course.id)}
                    />
                  ) : null
                )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
  },
  tabButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    position: "relative",
  },
  activeTabButton: {},
  tabText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#757575",
  },
  activeTabText: {
    color: "#E53935",
    fontWeight: "600",
  },
  activeIndicator: {
    position: "absolute",
    bottom: -1,
    height: 3,
    width: "100%",
    backgroundColor: "#E53935",
    borderRadius: 3,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  coursesContainer: {
    paddingTop: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#757575",
    textAlign: "center",
    lineHeight: 24,
  },
});

export default CourseTabSwitcher;
