// components/ActiveCourseCard.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Course } from "../../assets/data/types";

type ActiveCourseProps = {
  course: Course;
  onPressFavorite?: (courseId: string) => void;
  onPressContinue?: (courseId: string) => void;
};

const ActiveCourseCard: React.FC<ActiveCourseProps> = ({
  course,
  onPressFavorite,
  onPressContinue,
}) => {
  const progressPercent = Math.round((course.progress || 0) * 100);

  return (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.headerRow}>
        <Image source={{ uri: course.imageUrl }} style={styles.image} />
        <View style={styles.courseInfo}>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.instructor}>{course.instructor}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.category}>{course.category}</Text>
            <TouchableOpacity onPress={() => onPressFavorite?.(course.id)}>
              <Ionicons
                name={course.isFavorite ? "heart" : "heart-outline"}
                size={22}
                color={course.isFavorite ? "#F24E1E" : "#A0A0A0"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.status}>{course.status || "Offline"}</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressRow}>
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progressPercent}%`,
                backgroundColor: "#e91e63",
                opacity: 0.7,
              },
            ]}
          />
        </View>
        <Text style={styles.percentText}>{progressPercent}%</Text>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => onPressContinue?.(course.id)}
      >
        <Text style={styles.continueText}>Continue Learning</Text>
      </TouchableOpacity>

      {/* Best Seller */}
      {course.isBestSeller && (
        <View style={styles.bestSellerBadge}>
          <Text style={styles.bestSellerText}>Best Seller</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: "#F48FB1",
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    position: "relative",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
  courseInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2c3e50",
  },
  instructor: {
    fontSize: 14,
    color: "#6e6e6e",
    marginVertical: 2,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  category: {
    fontSize: 13,
    color: "#F24E1E",
    fontWeight: "500",
  },
  status: {
    color: "#EC407A",
    fontWeight: "600",
  },
  progressRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  progressBackground: {
    flex: 1,
    height: 8,
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
    marginRight: 8,
  },
  progressFill: {
    height: 8,
    borderRadius: 6,
  },
  percentText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#616161",
  },
  continueButton: {
    marginTop: 10,
    backgroundColor: "#f3f3f3",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  continueText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
  },
  bestSellerBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#FFD700",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  bestSellerText: {
    color: "#222B45",
    fontWeight: "bold",
    fontSize: 10,
  },
});

export default ActiveCourseCard;
