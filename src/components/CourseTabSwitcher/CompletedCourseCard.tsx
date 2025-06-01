// components/CourseTabSwitcher/CompletedCourseCard.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Course } from "../../assets/data/types";

type CompletedCourseProps = {
  course: Course; // Add course prop
  onPressCertificate?: (courseId: string) => void;
};

const CompletedCourseCard: React.FC<CompletedCourseProps> = ({
  course,
  onPressCertificate,
}) => {
  return (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.headerRow}>
        <Image source={{ uri: course.imageUrl }} style={styles.image} />
        <View style={styles.courseInfo}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {course.title}
          </Text>
          <Text style={styles.instructor}>{course.instructor}</Text>
        </View>
        {/* Completed Icon */}
        <View style={styles.completedCircle}>
          <Ionicons name="checkmark-done-circle" size={26} color="#23CB75" />
        </View>
      </View>

      {/* Get Certificate Button */}
      <TouchableOpacity
        style={styles.certificateButton}
        onPress={() => onPressCertificate?.(course.id)}
        activeOpacity={0.85}
      >
        <Text style={styles.certificateText}>Get Certificate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#f3b3db",
    padding: 14,
    marginBottom: 16,
    position: "relative",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
  courseInfo: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2c3e50",
  },
  instructor: {
    fontSize: 14,
    color: "#6e6e6e",
    marginVertical: 2,
  },
  completedCircle: {
    backgroundColor: "#E8FDF2",
    borderRadius: 999,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#23CB75",
  },
  certificateButton: {
    marginTop: 2,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#EC407A",
  },
  certificateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    letterSpacing: 0.1,
  },
});

export default CompletedCourseCard;
